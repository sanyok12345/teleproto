import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStickerSet } from "./messages/TypeStickerSet";

export class UpdateNewStickerSet extends TLObject {
    static CONSTRUCTOR_ID = 1753886890;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateNewStickerSet";
    static classType = "constructor";

    stickerset!: TypeStickerSet;

    constructor(args: { stickerset?: TypeStickerSet } = {}) {
        super();
        this.stickerset = args.stickerset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1753886890, false);
        writer.write(this.stickerset.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateNewStickerSet {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        return new UpdateNewStickerSet(args);
    }
}