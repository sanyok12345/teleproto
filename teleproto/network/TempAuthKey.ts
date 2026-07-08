import { createHash } from "node:crypto";
import bigInt from "big-integer";
import { Api } from "../tl";
import { AuthKey } from "../crypto/AuthKey";
import { IGE } from "../crypto/IGE";
import {
    generateRandomBytes,
    readBigIntFromBuffer,
    toSignedLittleBuffer,
} from "../Helpers";

export const TEMP_KEY_EXPIRES_IN = 24 * 60 * 60;

function sha1(data: Buffer): Buffer {
    return createHash("sha1").update(data).digest();
}

function calcKeyV1(authKey: Buffer, msgKey: Buffer): { key: Buffer; iv: Buffer } {
    const x = 0;
    const a = sha1(Buffer.concat([msgKey, authKey.subarray(x, x + 32)]));
    const b = sha1(
        Buffer.concat([
            authKey.subarray(x + 32, x + 48),
            msgKey,
            authKey.subarray(x + 48, x + 64),
        ])
    );
    const c = sha1(Buffer.concat([authKey.subarray(x + 64, x + 96), msgKey]));
    const d = sha1(Buffer.concat([msgKey, authKey.subarray(x + 96, x + 128)]));
    const key = Buffer.concat([
        a.subarray(0, 8),
        b.subarray(8, 20),
        c.subarray(4, 16),
    ]);
    const iv = Buffer.concat([
        a.subarray(8, 20),
        b.subarray(0, 8),
        c.subarray(16, 20),
        d.subarray(0, 8),
    ]);
    return { key, iv };
}

export function buildBindTempAuthKeyRequest(
    permKey: AuthKey,
    tempKey: AuthKey,
    tempSessionId: bigInt.BigInteger,
    msgId: bigInt.BigInteger,
    expiresAt: number
): Api.auth.BindTempAuthKey {
    if (!permKey.getKey() || !permKey.keyId) {
        throw new Error("bindTempAuthKey: permanent key is not ready");
    }
    if (!tempKey.keyId) {
        throw new Error("bindTempAuthKey: temporary key is not ready");
    }
    const nonce = readBigIntFromBuffer(generateRandomBytes(8), true, true);

    const inner = new Api.BindAuthKeyInner({
        nonce,
        tempAuthKeyId: tempKey.keyId,
        permAuthKeyId: permKey.keyId,
        tempSessionId,
        expiresAt,
    }).getBytes();

    const head = Buffer.alloc(24);
    generateRandomBytes(16).copy(head, 0);
    toSignedLittleBuffer(msgId, 8).copy(head, 16);
    const meta = Buffer.alloc(8);
    meta.writeInt32LE(0, 0);
    meta.writeInt32LE(inner.length, 4);
    let payload = Buffer.concat([head, meta, inner]);
    const pad = (16 - (payload.length % 16)) % 16;
    if (pad) payload = Buffer.concat([payload, generateRandomBytes(pad)]);

    const msgKey = sha1(payload.subarray(0, 24 + 8 + inner.length)).subarray(
        4,
        20
    );
    const { key, iv } = calcKeyV1(permKey.getKey()!, msgKey);
    const encrypted = new IGE(key, iv).encryptIge(payload);

    const encryptedMessage = Buffer.concat([
        toSignedLittleBuffer(permKey.keyId, 8),
        msgKey,
        encrypted,
    ]);

    return new Api.auth.BindTempAuthKey({
        permAuthKeyId: permKey.keyId,
        nonce,
        expiresAt,
        encryptedMessage,
    });
}
