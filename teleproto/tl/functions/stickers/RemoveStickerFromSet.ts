import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class RemoveStickerFromSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4151709521;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.RemoveStickerFromSet";
    static classType = "request";

    sticker!: TypeInputDocument;

    constructor(args: { sticker?: TypeInputDocument } = {}) {
        super();
        this.sticker = args.sticker!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4151709521, false);
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

    static fromReader(reader: BinaryReader): RemoveStickerFromSet {
        const args: any = {};
        const _sticker = reader.tgReadObject();
        args.sticker = _sticker;
        return new RemoveStickerFromSet(args);
    }
}