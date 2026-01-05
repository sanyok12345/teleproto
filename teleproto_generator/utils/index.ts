// CRC32 Implementation
let crcTable: number[] | undefined = undefined;

function makeCRCTable(): number[] {
    let c: number;
    const crcTable: number[] = [];
    for (let n = 0; n < 256; n++) {
        c = n;
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        crcTable[n] = c;
    }
    return crcTable;
}

export function crc32(buf: Buffer | string): number {
    if (!crcTable) {
        crcTable = makeCRCTable();
    }
    const buffer = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
    let crc = -1;

    for (let index = 0; index < buffer.length; index++) {
        const byte = buffer[index];
        crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ -1) >>> 0;
}
