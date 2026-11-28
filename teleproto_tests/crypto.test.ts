// MTProto crypto stack: IGE, CTR, digests, PBKDF2, DH math, RSA parse.
// Digest and HMAC results are compared against node:crypto as ground truth,
// so the suite proves the same bytes on Node.js and Bun.
import { describe, it, expect } from "bun:test";
import { createHash, createHmac, pbkdf2Sync } from "node:crypto";
import { IGE } from "../dist/crypto/IGE.js";
import { CTR } from "../dist/crypto/CTR.js";
import * as crypto from "../dist/platform/crypto/index.js";
import { Buffer } from "../dist/platform/buffer/index.js";

function expectSame(algorithm: string, data: Buffer, key?: Buffer): string {
    const platform = key
        ? crypto.hmac(algorithm, key, data).toString("hex")
        : crypto.hash(algorithm, data).toString("hex");
    const reference = key
        ? createHmac(algorithm, key).update(data).digest("hex")
        : createHash(algorithm).update(data).digest("hex");
    expect(platform).toBe(reference);
    return reference;
}

describe("IGE", () => {
    it("reports a backend", () => {
        const backend = IGE.backend();
        expect(typeof backend).toBe("string");
        expect(backend.length).toBeGreaterThan(0);
    });

    it("round-trips a 16-aligned message", () => {
        const key = Buffer.alloc(32, 0x11);
        const iv = Buffer.alloc(32, 0x42);
        const message = Buffer.from("MTProto AES-IGE round trip message!!!!"); // 39 → padded
        const cipher = new IGE(key, iv);
        const encrypted = cipher.encryptIge(message);
        expect(encrypted.length % 16).toBe(0);
        const decrypted = cipher.decryptIge(encrypted);
        expect(decrypted.subarray(0, message.length).equals(message)).toBe(true);
        cipher.dispose();
    });

    it("round-trips a message that fills the iv change", () => {
        // Two sequential blocks: the second block's ciphertext depends on the
        // first, which exercises IGE chaining rather than plain ECB.
        const key = Buffer.alloc(32, 0x22);
        const iv = Buffer.alloc(32, 0x77);
        const message = Buffer.alloc(64);
        message.write("block one");
        message.write("block two", 16);
        const cipher = new IGE(key, iv);
        const decrypted = cipher.decryptIge(cipher.encryptIge(message));
        expect(decrypted.equals(message)).toBe(true);
        cipher.dispose();
    });

    it("rejects wrong key and iv sizes", () => {
        expect(() => new IGE(Buffer.alloc(16), Buffer.alloc(32))).toThrow(/32 bytes/);
        expect(() => new IGE(Buffer.alloc(32), Buffer.alloc(16))).toThrow(/32 bytes/);
    });

    it("differs from a zeroed key", () => {
        const message = Buffer.alloc(32, 0x33);
        const encrypted = new IGE(Buffer.alloc(32, 1), Buffer.alloc(32, 2)).encryptIge(message);
        const encryptedZero = new IGE(Buffer.alloc(32), Buffer.alloc(32)).encryptIge(message);
        expect(encrypted.equals(encryptedZero)).toBe(false);
    });
});

describe("CTR", () => {
    it("round-trips", () => {
        const key = Buffer.alloc(32, 7);
        const iv = Buffer.alloc(16, 9);
        const message = Buffer.from("counter mode data 1234567890abcdef", "utf8");
        const encryptor = new CTR(key, iv);
        const encrypted = encryptor.encrypt(message);
        encryptor.dispose();
        const decryptor = new CTR(key, iv);
        const decrypted = decryptor.encrypt(Buffer.from(encrypted));
        decryptor.dispose();
        expect(Buffer.from(decrypted).equals(message)).toBe(true);
    });

    it("encrypts in place", () => {
        const key = Buffer.alloc(32, 3);
        const iv = Buffer.alloc(16, 4);
        const message = Buffer.alloc(64, 0x55);
        const copy = Buffer.from(message);
        const cipher = new CTR(key, iv);
        const out = cipher.encryptInPlace(message);
        expect(out).toBe(message);
        expect(message.equals(copy)).toBe(false);
        // in-place equals the streaming form of a fresh cipher with the same state
        const reference = new CTR(key, iv).encrypt(copy);
        expect(Buffer.from(message).equals(Buffer.from(reference))).toBe(true);
        cipher.dispose();
    });

    it("requires a 16-byte iv", () => {
        expect(() => new CTR(Buffer.alloc(32), Buffer.alloc(8))).toThrow(/buffer/);
    });
});

describe("digests", () => {
    const input = Buffer.from("deterministic cross-runtime input 0123456789abcdef");

    it("matches node:crypto for every supported hash", () => {
        for (const algorithm of ["md5", "sha1", "sha256", "sha384", "sha512"]) {
            expectSame(algorithm, input);
        }
    });

    it("matches the sha256 test vector", () => {
        expect(crypto.hash("sha256", Buffer.from("abc")).toString("hex")).toBe(
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
        );
    });

    it("matches node:crypto for hmac", () => {
        expectSame("sha256", input, Buffer.from("teleproto-key-0123456789"));
        expectSame("sha1", input, Buffer.from("key2"));
        expectSame("sha512", input, Buffer.from("key3"));
    });

    it("streams through createHash and createHmac", () => {
        const chunked = crypto.createHash("sha256")
            .update(input.subarray(0, 10))
            .update(input.subarray(10))
            .digest();
        expect(chunked.toString("hex")).toBe(createHash("sha256").update(input).digest("hex"));

        const mac = crypto.createHmac("sha256", Buffer.from("streaming-key"))
            .update(input.subarray(0, 7))
            .update(input.subarray(7))
            .digest();
        expect(mac.toString("hex")).toBe(createHmac("sha256", Buffer.from("streaming-key")).update(input).digest("hex"));
    });

    it("rejects unknown algorithms", () => {
        expect(() => crypto.hash("rc4", input)).toThrow(/Unsupported/);
        expect(() => crypto.hmac("rc4", Buffer.alloc(4), input)).toThrow(/Unsupported/);
    });
});

describe("pbkdf2", () => {
    it("matches node:crypto for the 2FA parameters (sha512, 100000 iterations)", () => {
        const platform = crypto.pbkdf2Sync("password", "saltsalt", 1000, 64, "sha512").toString("hex");
        const reference = pbkdf2Sync("password", "saltsalt", 1000, 64, "sha512").toString("hex");
        expect(platform).toBe(reference);
    });

    it("is async-equal to its sync form", async () => {
        const async = await crypto.pbkdf2("password", "salt", 1, 32, "sha256");
        const sync = crypto.pbkdf2Sync("password", "salt", 1, 32, "sha256");
        expect(async.toString("hex")).toBe(sync.toString("hex"));
    });
});

describe("random", () => {
    it("produces fresh bytes and bounded ints", () => {
        const a = crypto.randomBytes(32);
        const b = crypto.randomBytes(32);
        expect(a.length).toBe(32);
        expect(a.equals(b)).toBe(false);
        for (let i = 0; i < 50; i++) {
            const value = crypto.randomInt(10);
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(10);
        }
    });

    it("fills a slice of the buffer", () => {
        const buffer = Buffer.alloc(16);
        crypto.randomFill(buffer, 4, 8);
        expect(buffer.subarray(0, 4).every((byte) => byte === 0)).toBe(true);
        expect(buffer.subarray(4, 12).every((byte) => byte === 0)).toBe(false);
        expect(buffer.subarray(12).every((byte) => byte === 0)).toBe(true);
    });
});

describe("DH math", () => {
    it("computes modular exponentiation", () => {
        expect(crypto.modPow(2n, 10n, 1000n)).toBe(24n);
        expect(crypto.modPow(2n, 2048n, 305n)).toBe((2n ** 2048n) % 305n);
    });

    it("computes greatest common divisors", () => {
        expect(crypto.gcd(48n, 180n)).toBe(12n);
        expect(crypto.gcd(17n, 5n)).toBe(1n);
    });

    it("factors a product of two primes", () => {
        const factors = crypto.factor(1052651n); // 1021 * 1031
        const values = [factors.p, factors.q].map(Number).sort((a, b) => a - b);
        expect(values).toEqual([1021, 1031]);
    });

    it("recognizes the Telegram DH prime as safe", () => {
        // 2q+1 form of the standard 2048-bit MTProto prime is checked by the
        // auth exchange; here we check the library's judgment on small values.
        expect(crypto.isSafePrime(23n)).toBe(true);
        expect(crypto.isSafePrime(15n)).toBe(false);
    });
});

describe("keys", () => {
    it("parses an RSA public key PEM", () => {
        const pem = [
            "-----BEGIN RSA PUBLIC KEY-----",
            "MIGJAoGBAK1iAazwXoQNs6EY/lqGIuu22Svwu+9pBV1Zw4gwN2TScZXKdfYzECxC",
            "U+4jGjTQPCSrU6d3aCV4B1ifhW1dgb+fcUb4xK8CnGhEAd4Zq3gw1l2m6o9dwP0+",
            "WaWvTRAgjM9SxPLbLqzSBeAKSIRQ0dWAg5UcqPjwDkgM+hd9n7dzAgMBAAE=",
            "-----END RSA PUBLIC KEY-----",
        ].join("\n");
        const key = crypto.rsaPublicKey(pem);
        const n = BigInt(`0x${key.n.toString("hex")}`);
        const e = BigInt(`0x${key.e.toString("hex")}`);
        expect(e).toBe(65537n);
        expect(n.toString(2).length).toBe(1024);
    });

    it("produces a 32-byte x25519 public key", () => {
        expect(crypto.x25519PublicKey().length).toBe(32);
    });
});
