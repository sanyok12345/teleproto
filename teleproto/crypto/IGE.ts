import crypto from "node:crypto";
import * as Helpers from "../Helpers";

class IGE {
  private key: Buffer;
  private iv: Buffer;

  constructor(key: Buffer, iv: Buffer) {
    if (key.length !== 32) throw new Error("Key must be 32 bytes (AES-256)");
    if (iv.length !== 32)
      throw new Error("IV must be 32 bytes (2 * block size)");
    this.key = key;
    this.iv = iv;
  }

  private xorBuffers(a: Buffer, b: Buffer): Buffer {
    const res = Buffer.alloc(a.length);
    for (let i = 0; i < a.length; i++) {
      res[i] = a[i] ^ b[i];
    }
    return res;
  }

  private aesEncryptBlock(block: Buffer): Buffer {
    const cipher = crypto.createCipheriv("aes-256-ecb", this.key, null);
    cipher.setAutoPadding(false);
    return Buffer.concat([cipher.update(block), cipher.final()]);
  }

  private aesDecryptBlock(block: Buffer): Buffer {
    // AES-256-ECB без padding
    const decipher = crypto.createDecipheriv("aes-256-ecb", this.key, null);
    decipher.setAutoPadding(false);
    return Buffer.concat([decipher.update(block), decipher.final()]);
  }

  encryptIge(plainText: Buffer): Buffer {
    const blockSize = 16;
    const padding = plainText.length % blockSize;
    if (padding !== 0) {
      plainText = Buffer.concat([
        plainText,
        Helpers.generateRandomBytes(blockSize - padding),
      ]);
    }

    const iv1 = this.iv.slice(0, blockSize);
    const iv2 = this.iv.slice(blockSize, 2 * blockSize);

    let prevCipher = iv1;
    let prevPlain = iv2;

    const output = Buffer.alloc(plainText.length);

    for (let i = 0; i < plainText.length; i += blockSize) {
      const plainBlock = plainText.slice(i, i + blockSize);
      const xored = this.xorBuffers(plainBlock, prevCipher);
      const encrypted = this.aesEncryptBlock(xored);
      const cipherBlock = this.xorBuffers(encrypted, prevPlain);
      cipherBlock.copy(output, i);

      prevCipher = cipherBlock;
      prevPlain = plainBlock;
    }

    return output;
  }

  decryptIge(cipherText: Buffer): Buffer {
    const blockSize = 16;
    if (cipherText.length % blockSize !== 0) {
      throw new Error("Cipher text must be multiple of 16 bytes");
    }

    const iv1 = this.iv.slice(0, blockSize);
    const iv2 = this.iv.slice(blockSize, 2 * blockSize);

    let prevCipher = iv1;
    let prevPlain = iv2;

    const output = Buffer.alloc(cipherText.length);

    for (let i = 0; i < cipherText.length; i += blockSize) {
      const cipherBlock = cipherText.slice(i, i + blockSize);
      const xored = this.xorBuffers(cipherBlock, prevPlain);
      const decrypted = this.aesDecryptBlock(xored);
      const plainBlock = this.xorBuffers(decrypted, prevCipher);
      plainBlock.copy(output, i);

      prevCipher = cipherBlock;
      prevPlain = plainBlock;
    }

    return output;
  }
}

export { IGE };
