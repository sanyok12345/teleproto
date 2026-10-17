import bigInt, { type BigInteger } from "big-integer";
import { TypeNotFoundError } from "../../errors/Common";
import { readBigIntFromBuffer } from "../../Helpers";
import { registry } from "../runtime/Registry";

const BOOL_TRUE = 0x997275b5;
const BOOL_FALSE = 0xbc799737;
const VECTOR = 0x1cb5c415;

export class Reader {
    private readonly stream: Buffer;
    offset = 0;
    private last?: Buffer;

    constructor(data: Buffer) {
        this.stream = data;
    }

    private ensure(bytes: number) {
        if (this.offset + bytes > this.stream.length) {
            throw new Error(
                `No more data left to read (need ${bytes}, got ${Math.max(0, this.stream.length - this.offset)}); last read ${this.last}`
            );
        }
    }

    readByte(): number {
        this.ensure(1);
        return this.stream[this.offset++];
    }

    readInt(signed = true): number {
        this.ensure(4);
        const value = signed ? this.stream.readInt32LE(this.offset) : this.stream.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
    }

    readLong(signed = true): BigInteger {
        this.ensure(8);
        const value = signed ? this.stream.readBigInt64LE(this.offset) : this.stream.readBigUInt64LE(this.offset);
        this.offset += 8;
        return bigInt(value);
    }

    readFloat(): number {
        this.ensure(4);
        const value = this.stream.readFloatLE(this.offset);
        this.offset += 4;
        return value;
    }

    readDouble(): number {
        this.ensure(8);
        const value = this.stream.readDoubleLE(this.offset);
        this.offset += 8;
        return value;
    }

    readLargeInt(bits: number, signed = true): BigInteger {
        if (bits === 64) return this.readLong(signed);
        return readBigIntFromBuffer(this.read(Math.floor(bits / 8)), true, signed);
    }

    read(length = -1, checkLength = true): Buffer {
        if (length === -1) length = this.stream.length - this.offset;
        if (checkLength) this.ensure(length);
        const result = this.stream.subarray(this.offset, this.offset + length);
        this.offset += length;
        this.last = result;
        return result;
    }

    getBuffer(): Buffer {
        return this.stream;
    }

    tgReadBytes(): Buffer {
        const first = this.readByte();
        let length: number;
        let header: number;
        if (first === 254) {
            this.ensure(3);
            length = this.stream[this.offset] | (this.stream[this.offset + 1] << 8) | (this.stream[this.offset + 2] << 16);
            this.offset += 3;
            header = 4;
        } else {
            length = first;
            header = 1;
        }
        const data = this.read(length);
        const padding = (4 - ((header + length) % 4)) % 4;
        if (padding) this.read(padding);
        return data;
    }

    tgReadString(): string {
        return this.tgReadBytes().toString("utf-8");
    }

    tgReadBool(): boolean {
        const value = this.readInt(false);
        if (value === BOOL_TRUE) return true;
        if (value === BOOL_FALSE) return false;
        throw new Error(`Invalid boolean code ${value.toString(16)}`);
    }

    tgReadDate(): Date {
        return new Date(this.readInt() * 1000);
    }

    tgReadObject(): any {
        const constructorId = this.readInt(false);
        if (constructorId === BOOL_TRUE) return true;
        if (constructorId === BOOL_FALSE) return false;
        if (constructorId === VECTOR) {
            const length = this.readInt();
            const items = new Array(length);
            for (let i = 0; i < length; i++) items[i] = this.tgReadObject();
            return items;
        }
        const type = registry.readerFor(constructorId);
        if (!type) {
            this.offset -= 4;
            throw new TypeNotFoundError(constructorId, this.stream.subarray(this.offset));
        }
        return type.fromReader(this);
    }

    tgReadVector(): unknown[] {
        if (this.readInt(false) !== VECTOR) throw new Error("Invalid constructor code, vector was expected");
        const length = this.readInt();
        const items = new Array(length);
        for (let i = 0; i < length; i++) items[i] = this.tgReadObject();
        return items;
    }

    tellPosition(): number {
        return this.offset;
    }

    setPosition(position: number) {
        this.offset = position;
    }

    seek(offset: number) {
        this.offset += offset;
    }
}
