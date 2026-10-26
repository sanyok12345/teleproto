export interface Compression {
    gzip(data: Uint8Array): Buffer;
    gunzip(data: Uint8Array): Buffer;
    crc32(data: Uint8Array | string, previous?: number): number;
}
