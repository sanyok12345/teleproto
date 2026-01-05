import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDocument } from "../TypeDocument";

export class FoundStickers extends TLObject {
    static CONSTRUCTOR_ID = 2194268816;
    static SUBCLASS_OF_ID = 104866129;
    static className = "messages.FoundStickers";
    static classType = "constructor";

    flags!: number;
    nextOffset?: number;
    hash!: bigint;
    stickers!: TypeDocument[];

    constructor(args: { flags?: number, nextOffset?: number, hash?: bigint, stickers?: TypeDocument[] } = {}) {
        super();
        this.flags = args.flags!;
        this.nextOffset = args.nextOffset;
        this.hash = args.hash!;
        this.stickers = args.stickers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2194268816, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.writeInt(this.nextOffset);
        }
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.stickers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FoundStickers {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.readInt();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _stickers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stickers = _stickers;
        return new FoundStickers(args);
    }
}