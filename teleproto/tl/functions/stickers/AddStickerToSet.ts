import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";
import { TypeInputStickerSetItem } from "../../types/TypeInputStickerSetItem";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class AddStickerToSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2253651646;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.AddStickerToSet";
    static classType = "request";

    stickerset!: TypeInputStickerSet;
    sticker!: TypeInputStickerSetItem;

    constructor(args: { stickerset?: TypeInputStickerSet, sticker?: TypeInputStickerSetItem } = {}) {
        super();
        this.stickerset = args.stickerset!;
        this.sticker = args.sticker!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2253651646, false);
        writer.write(this.stickerset.getBytes());
        writer.write(this.sticker.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSet {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AddStickerToSet {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        const _sticker = reader.tgReadObject();
        args.sticker = _sticker;
        return new AddStickerToSet(args);
    }
}