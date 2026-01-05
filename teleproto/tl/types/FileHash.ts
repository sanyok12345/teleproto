import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class FileHash extends TLObject {
    static CONSTRUCTOR_ID = 4087022428;
    static SUBCLASS_OF_ID = 3939776691;
    static className = "FileHash";
    static classType = "constructor";

    offset!: bigint;
    limit!: number;
    hash!: Buffer;

    constructor(args: { offset?: bigint, limit?: number, hash?: Buffer } = {}) {
        super();
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4087022428, false);
        writer.writeLargeInt(this.offset, 64);
        writer.writeInt(this.limit);
        writer.tgWriteBytes(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileHash {
        const args: any = {};
        const _offset = reader.readLargeInt(64);
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.tgReadBytes();
        args.hash = _hash;
        return new FileHash(args);
    }
}