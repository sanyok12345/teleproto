import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStickerSet } from "./TypeInputStickerSet";

export class ChannelAdminLogEventActionChangeEmojiStickerSet extends TLObject {
    static CONSTRUCTOR_ID = 1188577451;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeEmojiStickerSet";
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
        writer.writeInt(1188577451, false);
        writer.write(this.prevStickerset.getBytes());
        writer.write(this.newStickerset.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeEmojiStickerSet {
        const args: any = {};
        const _prevStickerset = reader.tgReadObject();
        args.prevStickerset = _prevStickerset;
        const _newStickerset = reader.tgReadObject();
        args.newStickerset = _newStickerset;
        return new ChannelAdminLogEventActionChangeEmojiStickerSet(args);
    }
}