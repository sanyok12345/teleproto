import { crc32 as checksum, gzip as codec } from "cifrante";
import { crc32 as seededCrc32 } from "./crc32";
import { Buffer } from "../buffer";

export type * from "./types";

function toBuffer(bytes: Uint8Array): Buffer {
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

export function gzip(data: Uint8Array): Buffer {
    return toBuffer(codec.compress.sync(data));
}

export function gunzip(data: Uint8Array): Buffer {
    return toBuffer(codec.decompress.sync(data));
}

export function crc32(data: Uint8Array | string, previous = 0): number {
    return previous ? seededCrc32(data, previous) : checksum(data);
}
