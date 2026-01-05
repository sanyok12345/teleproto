import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeInputStickerSetItem } from "../../types/TypeInputStickerSetItem";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class ReplaceSticker extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1184253338;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.ReplaceSticker";
    static classType = "request";

    sticker!: TypeInputDocument;
    newSticker!: TypeInputStickerSetItem;

    constructor(args: { sticker?: TypeInputDocument, newSticker?: TypeInputStickerSetItem } = {}) {
        super();
        this.sticker = args.sticker!;
        this.newSticker = args.newSticker!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1184253338, false);
        writer.write(this.sticker.getBytes());
        writer.write(this.newSticker.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSet {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReplaceSticker {
        const args: any = {};
        const _sticker = reader.tgReadObject();
        args.sticker = _sticker;
        const _newSticker = reader.tgReadObject();
        args.newSticker = _newSticker;
        return new ReplaceSticker(args);
    }
}