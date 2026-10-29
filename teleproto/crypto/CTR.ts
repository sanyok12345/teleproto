import { Buffer, crypto, type CtrCipher } from "../platform";

export class CTR {
    private readonly state: CtrCipher;

    constructor(key: Buffer, iv: Buffer) {
        if (!Buffer.isBuffer(key) || !Buffer.isBuffer(iv) || iv.length !== 16) {
            throw new Error("Key and iv need to be a buffer");
        }

        this.state = crypto.aesCtr(key, iv);
    }

    encrypt(data: Uint8Array): Buffer {
        return this.state.update(data);
    }

    encryptInPlace(data: Buffer): Buffer {
        this.state.update(data, data);
        return data;
    }

    dispose(): void {
        this.state.dispose();
    }
}
