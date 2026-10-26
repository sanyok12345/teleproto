import { crypto, type IgeCipher } from "../platform";
import { generateRandomBytes } from "../Helpers";

const BLOCK_SIZE = 16;

class IGE {
    private readonly cipher: IgeCipher;
    private readonly iv: Buffer;

    constructor(key: Buffer, iv: Buffer) {
        if (key.length !== 32) throw new Error("Key must be 32 bytes (AES-256)");
        if (iv.length !== 32)
            throw new Error("IV must be 32 bytes (2 * block size)");
        this.cipher = crypto.aesIge(key);
        this.iv = iv;
    }

    encryptIge(plainText: Buffer, output?: Buffer): Buffer {
        const padding = plainText.length % BLOCK_SIZE;
        if (padding !== 0) {
            plainText = Buffer.concat([
                plainText,
                generateRandomBytes(BLOCK_SIZE - padding),
            ]);
        }
        return this.cipher.encrypt(plainText, this.iv, output);
    }

    decryptIge(cipherText: Buffer, output?: Buffer): Buffer {
        if (cipherText.length % BLOCK_SIZE !== 0) {
            throw new Error("Cipher text must be multiple of 16 bytes");
        }
        return this.cipher.decrypt(cipherText, this.iv, output);
    }

    static backend(): string {
        const probe = crypto.aesIge(Buffer.alloc(32));
        const { backend } = probe;
        probe.dispose();
        return backend;
    }

    dispose(): void {
        this.cipher.dispose();
    }
}

export { IGE };
