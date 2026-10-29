import type { BigInteger } from "big-integer";
import { toSignedLittleBuffer } from "../../Helpers";
import { Buffer } from "../../platform";

const INITIAL_SIZE = 256;

export class Writer {
    private buffer = Buffer.allocUnsafe(INITIAL_SIZE);
    private offset = 0;

    constructor(initial?: Buffer) {
        if (initial?.length) this.raw(initial);
    }

    private reserve(bytes: number) {
        const needed = this.offset + bytes;
        if (needed <= this.buffer.length) return;
        let size = this.buffer.length * 2;
        while (size < needed) size *= 2;
        const next = Buffer.allocUnsafe(size);
        this.buffer.copy(next, 0, 0, this.offset);
        this.buffer = next;
    }

    int(value: number) {
        this.reserve(4);
        this.buffer.writeInt32LE(value | 0, this.offset);
        this.offset += 4;
    }

    uint(value: number) {
        this.reserve(4);
        this.buffer.writeUInt32LE(value >>> 0, this.offset);
        this.offset += 4;
    }

    long(value: BigInteger) {
        this.reserve(8);
        const small = (value as unknown as { value: unknown }).value;
        const native = typeof small === "number" ? BigInt(small) : BigInt(value.toString());
        this.buffer.writeBigInt64LE(BigInt.asIntN(64, native), this.offset);
        this.offset += 8;
    }

    largeInt(value: BigInteger, bytes: number) {
        this.raw(toSignedLittleBuffer(value, bytes));
    }

    double(value: number) {
        this.reserve(8);
        this.buffer.writeDoubleLE(value, this.offset);
        this.offset += 8;
    }

    bytes(value: Buffer | string) {
        const data = typeof value === "string" ? Buffer.from(value, "utf8") : value;
        const length = data.length;
        const header = length < 254 ? 1 : 4;
        const padding = (4 - ((header + length) % 4)) % 4;
        this.reserve(header + length + padding);
        if (header === 1) {
            this.buffer[this.offset++] = length;
        } else {
            this.buffer[this.offset++] = 254;
            this.buffer[this.offset++] = length & 255;
            this.buffer[this.offset++] = (length >> 8) & 255;
            this.buffer[this.offset++] = (length >> 16) & 255;
        }
        data.copy(this.buffer, this.offset);
        this.offset += length;
        this.buffer.fill(0, this.offset, this.offset + padding);
        this.offset += padding;
    }

    raw(data: Buffer) {
        this.reserve(data.length);
        data.copy(this.buffer, this.offset);
        this.offset += data.length;
    }

    write(data: Buffer) {
        this.raw(data);
    }

    getValue(): Buffer {
        return Buffer.from(this.buffer.subarray(0, this.offset));
    }

    finish(): Buffer {
        const used = this.buffer.subarray(0, this.offset);
        return this.offset * 2 >= this.buffer.length ? used : Buffer.from(used);
    }
}
