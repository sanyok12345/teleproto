import zlib from "node:zlib";
import { crc32 as portableCrc32 } from "./crc32";

const nativeCrc32 = (zlib as { crc32?: (data: Uint8Array | string, value?: number) => number }).crc32;

export function gzip(data: Uint8Array): Buffer {
    return zlib.gzipSync(data);
}

export function gunzip(data: Uint8Array): Buffer {
    return zlib.unzipSync(data);
}

export function crc32(data: Uint8Array | string, previous = 0): number {
    return nativeCrc32 ? nativeCrc32(data, previous) >>> 0 : portableCrc32(data, previous);
}
