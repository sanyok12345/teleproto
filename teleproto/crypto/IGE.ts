import crypto from "node:crypto";
import * as Helpers from "../Helpers";

const InvSbox = new Uint8Array(256);
const Td0 = new Uint32Array(256);
const Td1 = new Uint32Array(256);
const Td2 = new Uint32Array(256);
const Td3 = new Uint32Array(256);
const Sbox = new Uint8Array(256);
const Rcon = [
  0x01000000, 0x02000000, 0x04000000, 0x08000000, 0x10000000, 0x20000000,
  0x40000000, 0x80000000, 0x1b000000, 0x36000000,
];

(function initTables() {
  const xtime = (a: number) => ((a << 1) ^ (a & 0x80 ? 0x11b : 0)) & 0xff;
  const inv = new Uint8Array(256);
  let p = 1;
  let q = 1;
  do {
    p = (p ^ (p << 1) ^ (p & 0x80 ? 0x11b : 0)) & 0xff;
    q ^= q << 1;
    q ^= q << 2;
    q ^= q << 4;
    q &= 0xff;
    if (q & 0x80) q ^= 0x09;
    inv[p] = q;
  } while (p !== 1);
  inv[0] = 0;
  for (let i = 0; i < 256; i++) {
    const x = inv[i];
    let s =
      x ^
      ((x << 1) | (x >> 7)) ^
      ((x << 2) | (x >> 6)) ^
      ((x << 3) | (x >> 5)) ^
      ((x << 4) | (x >> 4)) ^
      0x63;
    s &= 0xff;
    Sbox[i] = s;
    InvSbox[s] = i;
  }
  for (let i = 0; i < 256; i++) {
    const j = InvSbox[i];
    const m9 = (xtime(xtime(xtime(j))) ^ j) & 0xff; // 9·j
    const mb = (xtime(xtime(xtime(j))) ^ xtime(j) ^ j) & 0xff; // 11·j
    const md = (xtime(xtime(xtime(j))) ^ xtime(xtime(j)) ^ j) & 0xff; // 13·j
    const me = (xtime(xtime(xtime(j))) ^ xtime(xtime(j)) ^ xtime(j)) & 0xff; // 14·j
    Td0[i] = ((me << 24) | (m9 << 16) | (md << 8) | mb) >>> 0;
    Td1[i] = ((mb << 24) | (me << 16) | (m9 << 8) | md) >>> 0;
    Td2[i] = ((md << 24) | (mb << 16) | (me << 8) | m9) >>> 0;
    Td3[i] = ((m9 << 24) | (md << 16) | (mb << 8) | me) >>> 0;
  }
})();

function expandDecKey(key: Buffer): Uint32Array {
  const Nk = 8;
  const Nr = 14;
  const ek = new Uint32Array(4 * (Nr + 1));
  for (let i = 0; i < Nk; i++) {
    ek[i] =
      ((key[4 * i] << 24) |
        (key[4 * i + 1] << 16) |
        (key[4 * i + 2] << 8) |
        key[4 * i + 3]) >>>
      0;
  }
  for (let i = Nk; i < ek.length; i++) {
    let t = ek[i - 1];
    if (i % Nk === 0) {
      t = ((t << 8) | (t >>> 24)) >>> 0;
      t =
        ((Sbox[(t >>> 24) & 255] << 24) |
          (Sbox[(t >>> 16) & 255] << 16) |
          (Sbox[(t >>> 8) & 255] << 8) |
          Sbox[t & 255]) >>>
        0;
      t = (t ^ Rcon[i / Nk - 1]) >>> 0;
    } else if (i % Nk === 4) {
      t =
        ((Sbox[(t >>> 24) & 255] << 24) |
          (Sbox[(t >>> 16) & 255] << 16) |
          (Sbox[(t >>> 8) & 255] << 8) |
          Sbox[t & 255]) >>>
        0;
    }
    ek[i] = (ek[i - Nk] ^ t) >>> 0;
  }
  const dk = new Uint32Array(ek.length);
  for (let r = 0; r <= Nr; r++) {
    for (let c = 0; c < 4; c++) dk[4 * r + c] = ek[4 * (Nr - r) + c];
  }
  for (let r = 1; r < Nr; r++) {
    for (let c = 0; c < 4; c++) {
      const w = dk[4 * r + c];
      dk[4 * r + c] =
        (Td0[Sbox[(w >>> 24) & 255]] ^
          Td1[Sbox[(w >>> 16) & 255]] ^
          Td2[Sbox[(w >>> 8) & 255]] ^
          Td3[Sbox[w & 255]]) >>>
        0;
    }
  }
  return dk;
}

const AES256_ROUNDS = 14;

function decBlock(
  dk: Uint32Array,
  s0: number,
  s1: number,
  s2: number,
  s3: number,
  out: Uint32Array
): void {
  s0 = (s0 ^ dk[0]) >>> 0;
  s1 = (s1 ^ dk[1]) >>> 0;
  s2 = (s2 ^ dk[2]) >>> 0;
  s3 = (s3 ^ dk[3]) >>> 0;
  let k = 4;
  for (let r = 1; r < AES256_ROUNDS; r++) {
    const t0 =
      (Td0[(s0 >>> 24) & 255] ^
        Td1[(s3 >>> 16) & 255] ^
        Td2[(s2 >>> 8) & 255] ^
        Td3[s1 & 255] ^
        dk[k++]) >>>
      0;
    const t1 =
      (Td0[(s1 >>> 24) & 255] ^
        Td1[(s0 >>> 16) & 255] ^
        Td2[(s3 >>> 8) & 255] ^
        Td3[s2 & 255] ^
        dk[k++]) >>>
      0;
    const t2 =
      (Td0[(s2 >>> 24) & 255] ^
        Td1[(s1 >>> 16) & 255] ^
        Td2[(s0 >>> 8) & 255] ^
        Td3[s3 & 255] ^
        dk[k++]) >>>
      0;
    const t3 =
      (Td0[(s3 >>> 24) & 255] ^
        Td1[(s2 >>> 16) & 255] ^
        Td2[(s1 >>> 8) & 255] ^
        Td3[s0 & 255] ^
        dk[k++]) >>>
      0;
    s0 = t0;
    s1 = t1;
    s2 = t2;
    s3 = t3;
  }
  out[0] =
    (((InvSbox[(s0 >>> 24) & 255] << 24) |
      (InvSbox[(s3 >>> 16) & 255] << 16) |
      (InvSbox[(s2 >>> 8) & 255] << 8) |
      InvSbox[s1 & 255]) ^
      dk[k++]) >>>
    0;
  out[1] =
    (((InvSbox[(s1 >>> 24) & 255] << 24) |
      (InvSbox[(s0 >>> 16) & 255] << 16) |
      (InvSbox[(s3 >>> 8) & 255] << 8) |
      InvSbox[s2 & 255]) ^
      dk[k++]) >>>
    0;
  out[2] =
    (((InvSbox[(s2 >>> 24) & 255] << 24) |
      (InvSbox[(s1 >>> 16) & 255] << 16) |
      (InvSbox[(s0 >>> 8) & 255] << 8) |
      InvSbox[s3 & 255]) ^
      dk[k++]) >>>
    0;
  out[3] =
    (((InvSbox[(s3 >>> 24) & 255] << 24) |
      (InvSbox[(s2 >>> 16) & 255] << 16) |
      (InvSbox[(s1 >>> 8) & 255] << 8) |
      InvSbox[s0 & 255]) ^
      dk[k++]) >>>
    0;
}

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

  private xorBlock(
    dst: Buffer,
    di: number,
    a: Buffer,
    ai: number,
    b: Buffer,
    bi: number
  ): void {
    for (let j = 0; j < 16; j++) dst[di + j] = a[ai + j] ^ b[bi + j];
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

    const n = plainText.length;
    const iv1 = this.iv.subarray(0, blockSize);
    const iv2 = this.iv.subarray(blockSize, 2 * blockSize);

    const m = Buffer.allocUnsafe(n);
    for (let j = 0, o = 0; o < n; j++, o += blockSize) {
      if (j === 0) plainText.copy(m, 0, 0, blockSize);
      else if (j === 1) this.xorBlock(m, blockSize, plainText, blockSize, iv2, 0);
      else this.xorBlock(m, o, plainText, o, plainText, o - 2 * blockSize);
    }

    const cbc = crypto.createCipheriv("aes-256-cbc", this.key, iv1);
    cbc.setAutoPadding(false);
    const d = Buffer.concat([cbc.update(m), cbc.final()]);

    const output = Buffer.allocUnsafe(n);
    for (let j = 0, o = 0; o < n; j++, o += blockSize) {
      if (j === 0) this.xorBlock(output, 0, d, 0, iv2, 0);
      else this.xorBlock(output, o, d, o, plainText, o - blockSize);
    }
    return output;
  }

  decryptIge(cipherText: Buffer): Buffer {
    const blockSize = 16;
    const n = cipherText.length;
    if (n % blockSize !== 0) {
      throw new Error("Cipher text must be multiple of 16 bytes");
    }

    const dk = expandDecKey(this.key);
    const output = Buffer.allocUnsafe(n);
    const cv = new DataView(
      cipherText.buffer,
      cipherText.byteOffset,
      n
    );
    const ov = new DataView(output.buffer, output.byteOffset, n);

    let pc0 = this.iv.readUInt32BE(0);
    let pc1 = this.iv.readUInt32BE(4);
    let pc2 = this.iv.readUInt32BE(8);
    let pc3 = this.iv.readUInt32BE(12);
    let pp0 = this.iv.readUInt32BE(16);
    let pp1 = this.iv.readUInt32BE(20);
    let pp2 = this.iv.readUInt32BE(24);
    let pp3 = this.iv.readUInt32BE(28);

    const tmp = new Uint32Array(4);
    for (let i = 0; i < n; i += blockSize) {
      const c0 = cv.getUint32(i);
      const c1 = cv.getUint32(i + 4);
      const c2 = cv.getUint32(i + 8);
      const c3 = cv.getUint32(i + 12);
      decBlock(
        dk,
        (c0 ^ pp0) >>> 0,
        (c1 ^ pp1) >>> 0,
        (c2 ^ pp2) >>> 0,
        (c3 ^ pp3) >>> 0,
        tmp
      );
      const p0 = (tmp[0] ^ pc0) >>> 0;
      const p1 = (tmp[1] ^ pc1) >>> 0;
      const p2 = (tmp[2] ^ pc2) >>> 0;
      const p3 = (tmp[3] ^ pc3) >>> 0;
      ov.setUint32(i, p0);
      ov.setUint32(i + 4, p1);
      ov.setUint32(i + 8, p2);
      ov.setUint32(i + 12, p3);
      pc0 = c0;
      pc1 = c1;
      pc2 = c2;
      pc3 = c3;
      pp0 = p0;
      pp1 = p1;
      pp2 = p2;
      pp3 = p3;
    }
    return output;
  }
}

export { IGE };
