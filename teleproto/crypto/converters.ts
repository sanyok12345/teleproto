/*---------------------------------------------------------------------------------------------
 *  Copyright (c) sanyok12345. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for details.
 *--------------------------------------------------------------------------------------------*/

/**
 * Uint32Array -> ArrayBuffer (little-endian OS)
 * Writes each uint32 in big-endian byte order for stable, platform-independent representation.
 */
export function i2abLow(buf: Uint32Array): ArrayBufferLike {
    const out = new Uint8Array(buf.length * 4);
    let o = 0;

    for (let j = 0; j < buf.length; j++) {
        const v = buf[j] >>> 0;

        out[o++] = (v >>> 24) & 0xff;
        out[o++] = (v >>> 16) & 0xff;
        out[o++] = (v >>> 8) & 0xff;
        out[o++] = v & 0xff;
    }

    return out.buffer;
}

/**
 * Uint32Array -> ArrayBuffer (big-endian OS)
 * Direct buffer view is already in the desired memory layout.
 */
export function i2abBig(buf: Uint32Array): ArrayBufferLike {
    return buf.buffer;
}

/**
 * ArrayBuffer -> Uint32Array (little-endian OS)
 * Reads big-endian bytes into uint32 values.
 */
export function ab2iLow(ab: ArrayBufferLike | Uint8Array): Uint32Array {
    const src = ab instanceof Uint8Array ? ab : new Uint8Array(ab);
    const len = src.length;

    if (len % 4 !== 0)
        throw new RangeError("Byte length must be a multiple of 4");

    const out = new Uint32Array(len / 4);
    for (let i = 0, w = 0; i < len; i += 4) {
        out[w++] =
            ((src[i] << 24) >>> 0) ^
            ((src[i + 1] << 16) >>> 0) ^
            ((src[i + 2] << 8) >>> 0) ^
            (src[i + 3] >>> 0);
    }

    return out;
}

/**
 * ArrayBuffer -> Uint32Array (big-endian OS)
 */
export function ab2iBig(ab: ArrayBufferLike | Uint8Array): Uint32Array {
    return ab instanceof Uint8Array
        ? new Uint32Array(
            ab.buffer,
            ab.byteOffset,
            Math.floor(ab.byteLength / 4)
        )
        : new Uint32Array(ab);
}

/** Runtime endianness check (true if big-endian). */
export const isBigEndian =
    new Uint8Array(new Uint32Array([0x01020304]).buffer)[0] === 0x01;

export const i2ab = isBigEndian ? i2abBig : i2abLow;
export const ab2i = isBigEndian ? ab2iBig : ab2iLow;
