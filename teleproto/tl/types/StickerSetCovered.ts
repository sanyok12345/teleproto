import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStickerSet } from "./TypeStickerSet";
import { TypeDocument } from "./TypeDocument";

export class StickerSetCovered extends TLObject {
    static CONSTRUCTOR_ID = 1678812626;
    static SUBCLASS_OF_ID = 2139546853;
    static className = "StickerSetCovered";
    static classType = "constructor";

    set!: TypeStickerSet;
    cover!: TypeDocument;

    constructor(args: { set?: TypeStickerSet, cover?: TypeDocument } = {}) {
        super();
        this.set = args.set!;
        this.cover = args.cover!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1678812626, false);
        writer.write(this.set.getBytes());
        writer.write(this.cover.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetCovered {
        const args: any = {};
        const _set = reader.tgReadObject();
        args.set = _set;
        const _cover = reader.tgReadObject();
        args.cover = _cover;
        return new StickerSetCovered(args);
    }
}