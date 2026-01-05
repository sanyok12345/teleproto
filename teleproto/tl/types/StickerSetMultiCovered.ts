import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStickerSet } from "./TypeStickerSet";
import { TypeDocument } from "./TypeDocument";

export class StickerSetMultiCovered extends TLObject {
    static CONSTRUCTOR_ID = 872932635;
    static SUBCLASS_OF_ID = 2139546853;
    static className = "StickerSetMultiCovered";
    static classType = "constructor";

    set!: TypeStickerSet;
    covers!: TypeDocument[];

    constructor(args: { set?: TypeStickerSet, covers?: TypeDocument[] } = {}) {
        super();
        this.set = args.set!;
        this.covers = args.covers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(872932635, false);
        writer.write(this.set.getBytes());
        writer.writeVector(this.covers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetMultiCovered {
        const args: any = {};
        const _set = reader.tgReadObject();
        args.set = _set;
        const _covers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.covers = _covers;
        return new StickerSetMultiCovered(args);
    }
}