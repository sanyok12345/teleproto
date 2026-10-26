import { crypto } from "../platform";

export class CTR {
    private cipher: any;
    private decipher: any;

    constructor(key: Buffer, iv: Buffer, algorithm: string) {
        this.cipher = crypto.createCipher(algorithm, key, iv);
        this.decipher = crypto.createDecipher(algorithm, key, iv);
    }

    update(plainText: Buffer) {
        return this.encrypt(plainText);
    }

    encrypt(plainText: Buffer) {
        return this.cipher.update(plainText);
    }

    decrypt(cipherText: Buffer) {
        return this.decipher.update(cipherText);
    }
}

export function createDecipher(algorithm: string, key: Buffer, iv: Buffer) {
    if (algorithm.includes("ECB")) {
        throw new Error("ECB mode is not supported");
    }
    return new CTR(key, iv, algorithm);
}

export function createCipher(algorithm: string, key: Buffer, iv: Buffer) {
    if (algorithm.includes("ECB")) {
        throw new Error("ECB mode is not supported");
    }
    return new CTR(key, iv, algorithm);
}

export function randomBytes(count: number): Buffer {
    return crypto.randomBytes(count);
}

export class Hash {
    private readonly hash: any;

    constructor(algorithm: string) {
        this.hash = crypto.createHash(algorithm);
    }

    update(data: Buffer) {
        this.hash.update(data);
    }

    digest() {
        return this.hash.digest();
    }
}

export function pbkdf2Sync(
    password: any,
    salt: any,
    iterations: any,
    keylen: any,
    digest: any
): Buffer {
    return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
}

export function createHash(algorithm: string) {
    return new Hash(algorithm);
}