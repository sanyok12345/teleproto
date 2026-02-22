let crcTable: number[] | undefined;

function makeCrcTable(): number[] {
    const table: number[] = [];
    for (let n = 0; n < 256; n += 1) {
        let c = n;
        for (let k = 0; k < 8; k += 1) {
            c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        table[n] = c;
    }
    return table;
}

export function crc32(input: string | Buffer): number {
    if (!crcTable) {
        crcTable = makeCrcTable();
    }

    const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
    let crc = -1;

    for (let index = 0; index < buffer.length; index += 1) {
        const byte = buffer[index];
        crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }

    return (crc ^ -1) >>> 0;
}
