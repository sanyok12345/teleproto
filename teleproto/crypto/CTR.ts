import { createCipheriv as nodeCreateCipheriv } from "node:crypto";

export class CTR {
    private cipher: any;

    constructor(key: Buffer, iv: Buffer) {
        if (!Buffer.isBuffer(key) || !Buffer.isBuffer(iv) || iv.length !== 16) {
            throw new Error("Key and iv need to be a buffer");
        }

        this.cipher = nodeCreateCipheriv("AES-256-CTR", key, iv);
    }

    encrypt(data: any) {
        return Buffer.from(this.cipher.update(data));
    }
}
