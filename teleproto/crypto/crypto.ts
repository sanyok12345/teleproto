import {
    createCipheriv as nodeCreateCipheriv,
    createDecipheriv as nodeCreateDecipheriv,
    createHash as nodeCreateHash,
    randomBytes as nodeRandomBytes,
    pbkdf2Sync as nodePbkdf2Sync,
} from 'node:crypto';

export class CTR {
    private cipher: any;
    private decipher: any;

    constructor(key: Buffer, iv: Buffer, algorithm: string) {
        this.cipher = nodeCreateCipheriv(algorithm, key, iv);
        this.decipher = nodeCreateDecipheriv(algorithm, key, iv);
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

export function randomBytes(count: number) {
    return nodeRandomBytes(count);
}

export class Hash {
    private readonly hash: any;

    constructor(algorithm: string) {
        this.hash = nodeCreateHash(algorithm);
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
) {
    return nodePbkdf2Sync(password, salt, iterations, keylen, digest);
}

export function createHash(algorithm: string) {
    return new Hash(algorithm);
}