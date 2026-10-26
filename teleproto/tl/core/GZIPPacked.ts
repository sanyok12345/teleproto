import { Writer } from "../binary/Writer";
import type { Reader } from "../binary/Reader";
import { compression } from "../../platform";

const MIN_COMPRESS_SIZE = 128;
const SAMPLE_FROM_SIZE = 16384;
const SAMPLE_SIZE = 1024;
const MAX_RATIO = 0.9;

export class GZIPPacked {
    static readonly CONSTRUCTOR_ID = 0x3072cfa1;
    static readonly classType = "constructor";
    readonly CONSTRUCTOR_ID = GZIPPacked.CONSTRUCTOR_ID;
    readonly classType = "constructor";

    constructor(readonly data: Buffer) {}

    static gzipIfSmaller(contentRelated: boolean, data: Buffer): Buffer {
        if (!contentRelated || data.length < MIN_COMPRESS_SIZE) return data;
        if (data.length >= SAMPLE_FROM_SIZE) {
            const middle = data.subarray((data.length - SAMPLE_SIZE) >> 1, (data.length + SAMPLE_SIZE) >> 1);
            if (GZIPPacked.gzip(middle).length > middle.length * MAX_RATIO) return data;
        }
        const packed = new GZIPPacked(data).toBytes();
        return packed.length <= data.length * MAX_RATIO ? packed : data;
    }

    static gzip(input: Buffer): Buffer {
        return compression.gzip(input);
    }

    static ungzip(input: Buffer): Buffer {
        return compression.gunzip(input);
    }

    toBytes(): Buffer {
        const writer = new Writer();
        writer.uint(GZIPPacked.CONSTRUCTOR_ID);
        writer.bytes(GZIPPacked.gzip(this.data));
        return writer.finish();
    }

    static read(reader: Reader): Buffer {
        if (reader.readInt(false) !== GZIPPacked.CONSTRUCTOR_ID) throw new Error("gzip_packed expected");
        return GZIPPacked.ungzip(reader.tgReadBytes());
    }

    static fromReader(reader: Reader): GZIPPacked {
        return new GZIPPacked(GZIPPacked.ungzip(reader.tgReadBytes()));
    }
}
