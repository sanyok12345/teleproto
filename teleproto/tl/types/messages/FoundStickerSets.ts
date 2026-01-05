import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerSetCovered } from "../TypeStickerSetCovered";

export class FoundStickerSets extends TLObject {
    static CONSTRUCTOR_ID = 2331024850;
    static SUBCLASS_OF_ID = 68023137;
    static className = "messages.FoundStickerSets";
    static classType = "constructor";

    hash!: bigint;
    sets!: TypeStickerSetCovered[];

    constructor(args: { hash?: bigint, sets?: TypeStickerSetCovered[] } = {}) {
        super();
        this.hash = args.hash!;
        this.sets = args.sets!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2331024850, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.sets, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FoundStickerSets {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _sets = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sets = _sets;
        return new FoundStickerSets(args);
    }
}