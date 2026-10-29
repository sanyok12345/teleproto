import { Buffer } from "../buffer";

let table: Uint32Array | undefined;

function crcTable(): Uint32Array {
    const result = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        result[n] = c;
    }
    return result;
}

export function crc32(data: Uint8Array | string, previous = 0): number {
    table ??= crcTable();
    const bytes = typeof data === "string" ? Buffer.from(data) : data;
    let crc = previous ^ -1;
    for (let index = 0; index < bytes.length; index++) crc = table[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
    return (crc ^ -1) >>> 0;
}
