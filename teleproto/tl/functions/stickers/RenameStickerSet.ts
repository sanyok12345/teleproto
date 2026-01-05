import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class RenameStickerSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 306912256;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.RenameStickerSet";
    static classType = "request";

    stickerset!: TypeInputStickerSet;
    title!: string;

    constructor(args: { stickerset?: TypeInputStickerSet, title?: string } = {}) {
        super();
        this.stickerset = args.stickerset!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(306912256, false);
        writer.write(this.stickerset.getBytes());
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSet {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RenameStickerSet {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        const _title = reader.tgReadString();
        args.title = _title;
        return new RenameStickerSet(args);
    }
}