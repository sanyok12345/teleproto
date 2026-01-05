import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeFirebaseSms extends TLObject {
    static CONSTRUCTOR_ID = 10475318;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeFirebaseSms";
    static classType = "constructor";

    flags!: number;
    nonce?: Buffer;
    playIntegrityProjectId?: bigint;
    playIntegrityNonce?: Buffer;
    receipt?: string;
    pushTimeout?: number;
    length!: number;

    constructor(args: { flags?: number, nonce?: Buffer, playIntegrityProjectId?: bigint, playIntegrityNonce?: Buffer, receipt?: string, pushTimeout?: number, length?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nonce = args.nonce;
        this.playIntegrityProjectId = args.playIntegrityProjectId;
        this.playIntegrityNonce = args.playIntegrityNonce;
        this.receipt = args.receipt;
        this.pushTimeout = args.pushTimeout;
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(10475318, false);
        let flags = 0;
        if (this.nonce !== undefined && this.nonce !== null) { flags |= 1 << 0; }
        if (this.playIntegrityProjectId !== undefined && this.playIntegrityProjectId !== null) { flags |= 1 << 2; }
        if (this.playIntegrityNonce !== undefined && this.playIntegrityNonce !== null) { flags |= 1 << 2; }
        if (this.receipt !== undefined && this.receipt !== null) { flags |= 1 << 1; }
        if (this.pushTimeout !== undefined && this.pushTimeout !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.nonce !== undefined && this.nonce !== null) {
            writer.tgWriteBytes(this.nonce);
        }
        if (this.playIntegrityProjectId !== undefined && this.playIntegrityProjectId !== null) {
            writer.writeLargeInt(this.playIntegrityProjectId, 64);
        }
        if (this.playIntegrityNonce !== undefined && this.playIntegrityNonce !== null) {
            writer.tgWriteBytes(this.playIntegrityNonce);
        }
        if (this.receipt !== undefined && this.receipt !== null) {
            writer.tgWriteString(this.receipt);
        }
        if (this.pushTimeout !== undefined && this.pushTimeout !== null) {
            writer.writeInt(this.pushTimeout);
        }
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeFirebaseSms {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nonce = reader.tgReadBytes();
            args.nonce = _nonce;
        } else {
            args.nonce = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _playIntegrityProjectId = reader.readLargeInt(64);
            args.playIntegrityProjectId = _playIntegrityProjectId;
        } else {
            args.playIntegrityProjectId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _playIntegrityNonce = reader.tgReadBytes();
            args.playIntegrityNonce = _playIntegrityNonce;
        } else {
            args.playIntegrityNonce = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _receipt = reader.tgReadString();
            args.receipt = _receipt;
        } else {
            args.receipt = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _pushTimeout = reader.readInt();
            args.pushTimeout = _pushTimeout;
        } else {
            args.pushTimeout = undefined;
        }
        const _length = reader.readInt();
        args.length = _length;
        return new SentCodeTypeFirebaseSms(args);
    }
}