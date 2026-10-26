import bigInt from "big-integer";
import type { AuthKey } from "../../crypto/AuthKey";
import {
    generateRandomLong,
    readBigIntFromBuffer,
    readBufferFromBigInt,
    toSignedLittleBuffer,
} from "../../Helpers";
import { crypto } from "../../platform";
import { Api } from "../../tl";
import { GZIPPacked, TLMessage } from "../../tl/core";
import { Reader } from "../../tl/binary/Reader";
import type { Writer } from "../../tl/binary/Writer";
import type { Logger } from "../../extensions/Logger";
import { IGE } from "../../crypto/IGE";
import { InvalidBufferError, SecurityError } from "../../errors";
import { ReceivedIdsManager } from "./ReceivedIds";

export class DuplicateMessageError extends SecurityError {
    constructor(readonly msgId: bigInt.BigInteger) {
        super(`Duplicate message ${msgId}`);
    }
}

export class InvalidAuthKeyError extends SecurityError {
    constructor() {
        super("Server replied with an invalid auth key");
    }
}

const PADDED_SIZES = [64, 128, 192, 256, 384, 512, 768, 1024, 1280];
const MAX_MESSAGE_AGE_S = 300;
const MAX_MESSAGE_LEAD_S = 30;

function paddedSize(size: number, randomPadding: boolean): number {
    if (randomPadding) return (size + crypto.randomInt(256) + 12 + 15) & ~15;
    const minimal = (size + 12 + 15) & ~15;
    const bucket = PADDED_SIZES.find((value) => minimal <= value);
    return bucket ?? Math.ceil((minimal - 1280) / 448) * 448 + 1280;
}

function msgIdTime(msgId: bigInt.BigInteger): number {
    return msgId.shiftRight(32).toJSNumber() + msgId.and(0xffffffff).toJSNumber() / 2 ** 32;
}

export class SessionState {
    timeOffset = 0;
    salt = bigInt.zero;
    private id = bigInt.zero;
    private sequence = 0;
    private lastMsgId = bigInt.zero;
    private readonly receivedIds = new ReceivedIdsManager();

    constructor(
        private readonly authKey: AuthKey | undefined,
        private readonly log: Logger,
        private readonly securityChecks = true
    ) {
        this.reset();
    }

    get sessionId(): bigInt.BigInteger {
        return this.id;
    }

    hasReceived(msgId: bigInt.BigInteger): boolean {
        return this.receivedIds.has(msgId);
    }

    reset() {
        this.id = generateRandomLong(true);
        this.sequence = 0;
        this.lastMsgId = bigInt.zero;
        this.receivedIds.clear();
    }

    private calcKey(authKey: Buffer, msgKey: Buffer, client: boolean): { key: Buffer; iv: Buffer } {
        const x = client ? 0 : 8;
        const a = crypto.createHash("sha256").update(msgKey).update(authKey.subarray(x, x + 36)).digest();
        const b = crypto.createHash("sha256").update(authKey.subarray(x + 40, x + 76)).update(msgKey).digest();
        const key = Buffer.allocUnsafe(32);
        a.copy(key, 0, 0, 8);
        b.copy(key, 8, 8, 24);
        a.copy(key, 24, 24, 32);
        const iv = Buffer.allocUnsafe(32);
        b.copy(iv, 0, 0, 8);
        a.copy(iv, 8, 8, 24);
        b.copy(iv, 24, 24, 32);
        return { key, iv };
    }

    async writeDataAsMessage(
        buffer: Writer,
        data: Buffer,
        contentRelated: boolean,
        afterId?: bigInt.BigInteger,
        forcedMsgId?: bigInt.BigInteger,
        compress = contentRelated
    ): Promise<bigInt.BigInteger> {
        const msgId = forcedMsgId ?? this.newMsgId();
        const seqNo = this.nextSeqNo(contentRelated);
        const payload = afterId ? this.invokeAfter(afterId, data) : data;
        const body = await GZIPPacked.gzipIfSmaller(compress, payload);
        const header = Buffer.allocUnsafe(16);
        toSignedLittleBuffer(msgId, 8).copy(header, 0);
        header.writeInt32LE(seqNo, 8);
        header.writeInt32LE(body.length, 12);
        buffer.raw(header);
        buffer.raw(body);
        return msgId;
    }

    private invokeAfter(afterId: bigInt.BigInteger, data: Buffer): Buffer {
        const header = Buffer.allocUnsafe(12);
        header.writeUInt32LE(Api.InvokeAfterMsg.CONSTRUCTOR_ID, 0);
        toSignedLittleBuffer(afterId, 8).copy(header, 4);
        return Buffer.concat([header, data]);
    }

    async encryptMessageData(data: Buffer, randomPadding = false): Promise<Buffer> {
        if (!this.authKey) throw new Error("Auth key unset");
        await this.authKey.waitForKey();
        const authKey = this.authKey.getKey();
        const keyId = this.authKey.keyId;
        if (!authKey || !keyId) throw new Error("Auth key unset");

        const padLen = paddedSize(16 + data.length, randomPadding) - 16 - data.length;
        const packet = Buffer.allocUnsafe(24 + 16 + data.length + padLen);
        const plain = packet.subarray(24);
        toSignedLittleBuffer(this.salt, 8).copy(plain, 0);
        toSignedLittleBuffer(this.id, 8).copy(plain, 8);
        data.copy(plain, 16);
        crypto.randomFill(plain, 16 + data.length, padLen);

        const msgKey = crypto.createHash("sha256").update(authKey.subarray(88, 120)).update(plain).digest().subarray(8, 24);
        const { iv, key } = this.calcKey(authKey, msgKey, true);
        readBufferFromBigInt(keyId, 8).copy(packet, 0);
        msgKey.copy(packet, 8);
        const ige = new IGE(key, iv);
        ige.encryptIge(plain, plain);
        ige.dispose();
        return packet;
    }

    async decryptMessageData(body: Buffer): Promise<TLMessage> {
        if (!this.authKey) throw new Error("Auth key unset");
        if (body.length < 8) throw new InvalidBufferError(body);
        const keyId = readBigIntFromBuffer(body.subarray(0, 8));
        if (!this.authKey.keyId || keyId.neq(this.authKey.keyId)) throw new InvalidAuthKeyError();
        const authKey = this.authKey.getKey();
        if (!authKey) throw new InvalidAuthKeyError();
        if (body.length < 24 + 32 || (body.length - 24) % 16) throw new SecurityError("Invalid encrypted payload length");

        const msgKey = body.subarray(8, 24);
        const { iv, key } = this.calcKey(authKey, msgKey, false);
        const encrypted = body.subarray(24);
        const ige = new IGE(key, iv);
        const plain = ige.decryptIge(encrypted, encrypted);
        ige.dispose();

        const ourKey = crypto.createHash("sha256").update(authKey.subarray(96, 128)).update(plain).digest();
        if (!msgKey.equals(ourKey.subarray(8, 24))) {
            throw new SecurityError("Received msg_key doesn't match with expected one");
        }

        const reader = new Reader(plain);
        reader.readLong();
        const sessionId = reader.readLong();
        if (sessionId.neq(this.id) && this.securityChecks) {
            throw new SecurityError("Server replied with a wrong session ID");
        }
        const msgId = reader.readLong();
        const seqNo = reader.readInt();
        const length = reader.readInt();
        if (this.securityChecks) {
            const padding = plain.length - 32 - length;
            if (length < 0 || length % 4 || padding < 12 || padding > 1024) throw new SecurityError("Invalid message length");
            if (msgId.isEven()) throw new SecurityError(`Server sent an even msg_id ${msgId}`);
        }
        this.observeServerTime(msgId);
        const age = this.now() - msgIdTime(msgId);
        const registered = this.receivedIds.registerMsgId(msgId);
        this.receivedIds.shrink();
        if (this.securityChecks) {
            if (registered === "duplicate") throw new DuplicateMessageError(msgId);
            if (registered !== "success") throw new SecurityError(`Rejected message: ${registered}`);
            if (age > MAX_MESSAGE_AGE_S) throw new SecurityError(`Message ${msgId} is too old`);
            if (age < -MAX_MESSAGE_LEAD_S) throw new SecurityError(`Message ${msgId} is too far in the future`);
        }
        return new TLMessage(msgId, seqNo, reader.tgReadObject());
    }

    private now(): number {
        return Date.now() / 1000 + this.timeOffset;
    }

    private observeServerTime(msgId: bigInt.BigInteger) {
        const offset = msgIdTime(msgId) - Date.now() / 1000;
        if (offset > this.timeOffset) this.timeOffset = offset;
    }

    newMsgId(): bigInt.BigInteger {
        const now = this.now();
        const seconds = Math.floor(now);
        const fraction = Math.floor((now - seconds) * 2 ** 32) & ~3;
        let msgId = bigInt(seconds).shiftLeft(32).or(bigInt(fraction >>> 0));
        if (this.lastMsgId.greaterOrEquals(msgId)) msgId = this.lastMsgId.add(4);
        this.lastMsgId = msgId;
        return msgId;
    }

    updateTimeOffset(correctMsgId: bigInt.BigInteger): number {
        const old = this.timeOffset;
        this.timeOffset = msgIdTime(correctMsgId) - Date.now() / 1000;
        this.lastMsgId = bigInt.zero;
        this.log.debug(`Updated time offset from ${old.toFixed(3)}s to ${this.timeOffset.toFixed(3)}s`);
        return this.timeOffset;
    }

    nextSeqNo(contentRelated: boolean): number {
        if (!contentRelated) return this.sequence * 2;
        return this.sequence++ * 2 + 1;
    }
}
