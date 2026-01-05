import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerSet } from "../TypeStickerSet";

export class AllStickers extends TLObject {
    static CONSTRUCTOR_ID = 3451637435;
    static SUBCLASS_OF_ID = 1166231593;
    static className = "messages.AllStickers";
    static classType = "constructor";

    hash!: bigint;
    sets!: TypeStickerSet[];

    constructor(args: { hash?: bigint, sets?: TypeStickerSet[] } = {}) {
        super();
        this.hash = args.hash!;
        this.sets = args.sets!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3451637435, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.sets, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AllStickers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _sets = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sets = _sets;
        return new AllStickers(args);
    }
}