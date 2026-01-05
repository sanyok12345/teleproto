import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerSetCovered } from "../TypeStickerSetCovered";

export class FeaturedStickers extends TLObject {
    static CONSTRUCTOR_ID = 3191351558;
    static SUBCLASS_OF_ID = 638891810;
    static className = "messages.FeaturedStickers";
    static classType = "constructor";

    flags!: number;
    premium?: boolean;
    hash!: bigint;
    count!: number;
    sets!: TypeStickerSetCovered[];
    unread!: bigint[];

    constructor(args: { flags?: number, premium?: boolean, hash?: bigint, count?: number, sets?: TypeStickerSetCovered[], unread?: bigint[] } = {}) {
        super();
        this.flags = args.flags!;
        this.premium = args.premium;
        this.hash = args.hash!;
        this.count = args.count!;
        this.sets = args.sets!;
        this.unread = args.unread!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3191351558, false);
        let flags = 0;
        if (this.premium) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.premium !== undefined && this.premium !== null) {
        }
        writer.writeLargeInt(this.hash, 64);
        writer.writeInt(this.count);
        writer.writeVector(this.sets, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.unread, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FeaturedStickers {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _premium = true;
            args.premium = _premium;
        } else {
            args.premium = false;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _count = reader.readInt();
        args.count = _count;
        const _sets = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sets = _sets;
        const _unread = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.unread = _unread;
        return new FeaturedStickers(args);
    }
}