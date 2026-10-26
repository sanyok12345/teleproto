import { math, random } from "cifrante";

const P = (1n << 255n) - 19n;
const A24 = 121665n;
const BASE = 9n;

function mod(value: bigint): bigint {
    const result = value % P;
    return result < 0n ? result + P : result;
}

function scalarOf(bytes: Uint8Array): bigint {
    const clamped = Uint8Array.from(bytes);
    clamped[0] &= 248;
    clamped[31] &= 127;
    clamped[31] |= 64;
    let scalar = 0n;
    for (let i = 31; i >= 0; i--) scalar = (scalar << 8n) | BigInt(clamped[i]);
    return scalar;
}

function encode(value: bigint): Buffer {
    const out = Buffer.alloc(32);
    for (let i = 0; i < 32; i++, value >>= 8n) out[i] = Number(value & 0xffn);
    return out;
}

export function x25519Base(secret: Uint8Array): Buffer {
    const k = scalarOf(secret);
    let x2 = 1n, z2 = 0n, x3 = BASE, z3 = 1n, swap = 0n;
    for (let t = 254n; t >= 0n; t--) {
        const bit = (k >> t) & 1n;
        if (swap ^ bit) [x2, x3, z2, z3] = [x3, x2, z3, z2];
        swap = bit;
        const a = mod(x2 + z2), aa = mod(a * a), b = mod(x2 - z2), bb = mod(b * b), e = mod(aa - bb);
        const c = mod(x3 + z3), d = mod(x3 - z3), da = mod(d * a), cb = mod(c * b);
        x3 = mod((da + cb) ** 2n);
        z3 = mod(BASE * mod((da - cb) ** 2n));
        x2 = mod(aa * bb);
        z2 = mod(e * (aa + A24 * e));
    }
    if (swap) [x2, z2] = [x3, z3];
    return encode(mod(x2 * math.modPow(z2, P - 2n, P)));
}

export function x25519PublicKey(): Buffer {
    return x25519Base(random(32));
}
