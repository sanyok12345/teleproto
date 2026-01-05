import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStickerSet } from "./TypeStickerSet";

export class StickerSetNoCovered extends TLObject {
    static CONSTRUCTOR_ID = 2008112412;
    static SUBCLASS_OF_ID = 2139546853;
    static className = "StickerSetNoCovered";
    static classType = "constructor";

    set!: TypeStickerSet;

    constructor(args: { set?: TypeStickerSet } = {}) {
        super();
        this.set = args.set!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2008112412, false);
        writer.write(this.set.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetNoCovered {
        const args: any = {};
        const _set = reader.tgReadObject();
        args.set = _set;
        return new StickerSetNoCovered(args);
    }
}