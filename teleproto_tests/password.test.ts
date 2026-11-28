// 2FA password (MTProto SRP): the digest is deterministic given fixed inputs,
// and computeCheck produces a well-formed InputCheckPasswordSRP against a
// simulated server B. Runs the full pipeline: sha256 chains, PBKDF2-SHA512
// (100000 iterations) and 2048-bit modExp.
import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createHash, pbkdf2Sync } from "node:crypto";
import bigInt from "big-integer";
import { computeDigest, computeCheck } from "../dist/Password.js";
import { modExp, readBigIntFromBuffer, sha256, bigIntMod } from "../dist/Helpers.js";
import { Api } from "../dist/tl/index.js";
import { Buffer, crypto } from "../dist/platform/index.js";

// The standard 2048-bit MTProto DH prime that Password.checkPrimeAndGood
// accepts, kept byte-exact in a fixture (import.meta.dir is Bun-only, so the
// path comes from import.meta.url, which both runtimes provide).
const P = Buffer.from(readFileSync(fileURLToPath(new URL("./fixtures/dh-prime.bin", import.meta.url))));
const G = 3;
const SALT1 = Buffer.from("0123456789abcdef", "utf8");
const SALT2 = Buffer.from("fedcba9876543210", "utf8");

function algo() {
    return new Api.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow({
        salt1: SALT1,
        salt2: SALT2,
        g: G,
        p: P,
    });
}

function passwordRequest(srpB: Buffer) {
    return new Api.account.Password({
        hasPassword: true,
        currentAlgo: algo(),
        srp_B: srpB,
        srpId: bigInt("131212121212123123"),
        hint: "",
        emailUnconfirmedPattern: "",
        newAlgo: algo(),
        newSecureAlgo: new Api.PasswordKdfAlgoUnknown(),
        secureRandom: Buffer.alloc(0),
    });
}

describe("password digest", () => {
    it("returns 256 bytes for the Telegram prime", async () => {
        const digest = await computeDigest(algo(), "correct horse battery staple");
        expect(digest.length).toBe(256);
    });

    it("is deterministic and password-sensitive", async () => {
        const first = (await computeDigest(algo(), "same password")).toString("hex");
        const second = (await computeDigest(algo(), "same password")).toString("hex");
        const other = (await computeDigest(algo(), "other password")).toString("hex");
        expect(first).toBe(second);
        expect(first).not.toBe(other);
    });

    it("rejects a prime that is not the Telegram constant", async () => {
        const bad = algo();
        bad.p = Buffer.concat([P.subarray(0, 255), Buffer.from([0x00])]);
        await expect(computeDigest(bad, "pw")).rejects.toThrow(/bad p\/g/);
    });
});

describe("computeCheck", () => {
    it("produces a well-formed SRP answer against a simulated server", async () => {
        // Server side of SRP-6a: B = g^b (mod p) for a fresh random b. The
        // client pipeline under test only needs a well-formed B in (0, p).
        const pInt = readBigIntFromBuffer(P, false);
        const b = readBigIntFromBuffer(crypto.randomBytes(256), false).mod(pInt.subtract(2)).add(1);
        const serverB = modExp(bigInt(G), b, pInt);
        const bytes = Buffer.from(serverB.toString(16).padStart(512, "0"), "hex");
        expect(bytes.length).toBe(256);

        const result = await computeCheck(passwordRequest(bytes), "correct horse battery staple");
        expect(result).toBeInstanceOf(Api.InputCheckPasswordSRP);
        expect(result.A.length).toBe(256);
        expect(result.M1.length).toBe(32);
        expect(result.srpId.toString()).toBe("131212121212123123");
    }, 30000);

    it("rejects a B that fails the goodness checks", async () => {
        // B = 0 → isGoodLarge false → "bad b in check"
        await expect(computeCheck(passwordRequest(Buffer.alloc(256)), "pw")).rejects.toThrow(/bad b/);
    });

    it("verifies the SRP shared secret matches the server side", async () => {
        // Full round trip with an independent server implementation (per
        // Telegram's SRP spec): x from the documented hash chain, verifier
        // v = g^x, B = g^b + k*v, then the expected M1 recomputed from the
        // server's S. When the client's SRP math agrees, M1 matches.
        const password = "correct horse battery staple";
        const pwBytes = Buffer.from(password, "utf-8");
        const hash = (data: Buffer) => createHash("sha256").update(data).digest();
        const concat = (...parts: Buffer[]) => Buffer.concat(parts);

        // Per Telegram's spec: h1 = H(salt1 || pw || salt1); h2 = H(salt2 || h1 || salt2);
        // h3 = PBKDF2-HMAC-SHA512(h2, salt1, 100000, 64); x = H(salt2 || h3 || salt2)
        const h1 = hash(concat(SALT1, pwBytes, SALT1));
        const h2 = hash(concat(SALT2, h1, SALT2));
        const h3 = pbkdf2Sync(h2, SALT1, 100000, 64, "sha512");
        const x = readBigIntFromBuffer(hash(concat(SALT2, Buffer.from(h3), SALT2)), false);

        const pInt = readBigIntFromBuffer(P, false);
        const gInt = bigInt(G);
        const v = modExp(gInt, x, pInt); // server's stored verifier

        const pForHash = concat(Buffer.alloc(256 - P.length), P);
        const gForHash = concat(Buffer.alloc(255), Buffer.from([G]));
        const k = readBigIntFromBuffer(hash(concat(pForHash, gForHash)), false);

        const bInt = readBigIntFromBuffer(crypto.randomBytes(256), false).mod(pInt.subtract(2)).add(1);
        const serverB = bigIntMod(gInt.modPow(bInt, pInt).add(k.multiply(v)), pInt);
        const bytes = Buffer.from(serverB.toString(16).padStart(512, "0"), "hex");

        const result = await computeCheck(passwordRequest(bytes), password);
        const aInt = readBigIntFromBuffer(result.A, false); // client's public A = g^a

        // Server: u = H(A || B), S = (A * v^u)^b (mod p), K = H(S padded to 256)
        const u = readBigIntFromBuffer(hash(concat(result.A, bytes)), false);
        const serverS = modExp(bigIntMod(aInt.multiply(modExp(v, u, pInt)), pInt), bInt, pInt);
        const sharedK = hash(Buffer.from(serverS.toString(16).padStart(512, "0"), "hex"));

        // M1 = H(xor(H(p), H(g)) || H(salt1) || H(salt2) || A || B || K)
        const xor = (a: Buffer, b: Buffer) => {
            const out = Buffer.from(a);
            for (let i = 0; i < out.length; i++) out[i] ^= b[i];
            return out;
        };
        const expectedM1 = hash(concat(
            xor(hash(pForHash), hash(gForHash)),
            hash(SALT1),
            hash(SALT2),
            result.A,
            bytes,
            sharedK,
        ));
        expect(result.M1.toString("hex")).toBe(expectedM1.toString("hex"));
    }, 30000);
});
