import { aes, hmac as hmacs, kdf, math, md5, random, rsa, sha1, sha256, sha384, sha512, x25519, type Hash, type Hmac } from "cifrante";
import type { BinaryInput, CtrCipher, Factors, Hasher, IgeCipher, RsaPublicKey, StreamCipher } from "./types";

export type * from "./types";

const HASHES: Record<string, Hash> = { md5, sha1, sha256, sha384, sha512 };
const HMACS: Record<string, Hmac> = { ...hmacs };
const CTR_ALGORITHM = /^aes-(128|192|256)-ctr$/i;

interface DigestState {
    update(data: BinaryInput): unknown;
    digest(): Uint8Array;
}

function toBuffer(bytes: Uint8Array): Buffer {
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function bigintBytes(value: bigint): Buffer {
    const hex = value.toString(16);
    return Buffer.from(hex.length % 2 ? `0${hex}` : hex, "hex");
}

function algorithmName(table: Record<string, unknown>, algorithm: string): string {
    const name = algorithm.toLowerCase();
    if (!Object.hasOwn(table, name)) throw new Error(`Unsupported digest algorithm ${algorithm}`);
    return name;
}

function pick<T>(table: Record<string, T>, algorithm: string): T {
    return table[algorithmName(table, algorithm)];
}

function hasher(state: DigestState): Hasher {
    const wrapped: Hasher = {
        update(data) {
            state.update(data);
            return wrapped;
        },
        digest: () => toBuffer(state.digest()),
    };
    return wrapped;
}

export function randomBytes(count: number): Buffer {
    return toBuffer(random(count));
}

export function randomInt(max: number): number {
    return random.int(max);
}

export function randomFill(buffer: Uint8Array, offset: number, length: number): void {
    random.fill(buffer, offset, length);
}

export function createHash(algorithm: string): Hasher {
    return hasher(pick(HASHES, algorithm).sync.create());
}

export function hash(algorithm: string, data: BinaryInput): Buffer {
    return toBuffer(pick(HASHES, algorithm).sync(data));
}

export function createHmac(algorithm: string, key: Uint8Array): Hasher {
    return hasher(pick(HMACS, algorithm).sync.create(key));
}

export function hmac(algorithm: string, key: Uint8Array, data: BinaryInput): Buffer {
    return toBuffer(pick(HMACS, algorithm).sync(key, data));
}

function kdfHash(digest: string): keyof typeof hmacs {
    return algorithmName(HMACS, digest) as keyof typeof hmacs;
}

export async function pbkdf2(password: BinaryInput, salt: BinaryInput, iterations: number, length: number, digest: string): Promise<Buffer> {
    return toBuffer(await kdf.pbkdf2(password, salt, { hash: kdfHash(digest), iterations, length }));
}

export function pbkdf2Sync(password: BinaryInput, salt: BinaryInput, iterations: number, length: number, digest: string): Buffer {
    return toBuffer(kdf.pbkdf2.sync(password, salt, { hash: kdfHash(digest), iterations, length }));
}

function streamCipher(algorithm: string, key: Uint8Array, iv: Uint8Array): StreamCipher {
    if (!CTR_ALGORITHM.test(algorithm)) throw new Error(`Unsupported cipher algorithm ${algorithm}`);
    const state = aesCtr(key, iv);
    return { update: (data) => state.update(data), final: () => Buffer.alloc(0) };
}

export function createCipher(algorithm: string, key: Uint8Array, iv: Uint8Array): StreamCipher {
    return streamCipher(algorithm, key, iv);
}

export function createDecipher(algorithm: string, key: Uint8Array, iv: Uint8Array): StreamCipher {
    return streamCipher(algorithm, key, iv);
}

export function aesIge(key: Uint8Array): IgeCipher {
    const cipher = aes.ige(key);
    return {
        backend: cipher.backend,
        encrypt: (data, iv, output) => toBuffer(cipher.encryptSync(data, { iv, output })),
        decrypt: (data, iv, output) => toBuffer(cipher.decryptSync(data, { iv, output })),
        dispose: () => cipher.dispose(),
    };
}

export function aesCtr(key: Uint8Array, iv: Uint8Array): CtrCipher {
    const cipher = aes.ctr(key);
    const state = cipher.create({ iv });
    cipher.dispose();
    return {
        update: (data, output) => toBuffer(state.update(data, output)),
        dispose: () => state.dispose(),
    };
}

export function rsaPublicKey(pem: string): RsaPublicKey {
    const { n, e } = rsa.publicKey(pem);
    return { n: bigintBytes(n), e: bigintBytes(e) };
}

export function x25519PublicKey(): Buffer {
    return toBuffer(x25519.keys.sync().publicKey);
}

export function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    return math.modPow(base, exponent, modulus);
}

export function gcd(a: bigint, b: bigint): bigint {
    return math.gcd(a, b);
}

export function factor(value: bigint): Factors {
    return math.factor(value);
}

export function isSafePrime(value: bigint): boolean {
    return math.isSafePrime(value);
}
