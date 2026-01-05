import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStickerSet } from "./TypeInputStickerSet";

export class ChannelAdminLogEventActionChangeStickerSet extends TLObject {
    static CONSTRUCTOR_ID = 2982398631;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeStickerSet";
    static classType = "constructor";

    prevStickerset!: TypeInputStickerSet;
    newStickerset!: TypeInputStickerSet;

    constructor(args: { prevStickerset?: TypeInputStickerSet, newStickerset?: TypeInputStickerSet } = {}) {
        super();
        this.prevStickerset = args.prevStickerset!;
        this.newStickerset = args.newStickerset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2982398631, false);
        writer.write(this.prevStickerset.getBytes());
        writer.write(this.newStickerset.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeStickerSet {
        const args: any = {};
        const _prevStickerset = reader.tgReadObject();
        args.prevStickerset = _prevStickerset;
        const _newStickerset = reader.tgReadObject();
        args.newStickerset = _newStickerset;
        return new ChannelAdminLogEventActionChangeStickerSet(args);
    }
}