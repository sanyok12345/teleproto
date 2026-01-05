import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeMaskCoords } from "../../types/TypeMaskCoords";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class ChangeSticker extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4115889852;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.ChangeSticker";
    static classType = "request";

    flags?: number;
    sticker!: TypeInputDocument;
    emoji?: string;
    maskCoords?: TypeMaskCoords;
    keywords?: string;

    constructor(args: { flags?: number, sticker?: TypeInputDocument, emoji?: string, maskCoords?: TypeMaskCoords, keywords?: string } = {}) {
        super();
        this.flags = args.flags;
        this.sticker = args.sticker!;
        this.emoji = args.emoji;
        this.maskCoords = args.maskCoords;
        this.keywords = args.keywords;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4115889852, false);
        let flags = 0;
        if (this.emoji !== undefined && this.emoji !== null) { flags |= 1 << 0; }
        if (this.maskCoords !== undefined && this.maskCoords !== null) { flags |= 1 << 1; }
        if (this.keywords !== undefined && this.keywords !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write(this.sticker.getBytes());
        if (this.emoji !== undefined && this.emoji !== null) {
            writer.tgWriteString(this.emoji);
        }
        if (this.maskCoords !== undefined && this.maskCoords !== null) {
            writer.write(this.maskCoords.getBytes());
        }
        if (this.keywords !== undefined && this.keywords !== null) {
            writer.tgWriteString(this.keywords);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSet {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ChangeSticker {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _sticker = reader.tgReadObject();
        args.sticker = _sticker;
        if (args.flags & (1 << 0)) {
            const _emoji = reader.tgReadString();
            args.emoji = _emoji;
        } else {
            args.emoji = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _maskCoords = reader.tgReadObject();
            args.maskCoords = _maskCoords;
        } else {
            args.maskCoords = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _keywords = reader.tgReadString();
            args.keywords = _keywords;
        } else {
            args.keywords = undefined;
        }
        return new ChangeSticker(args);
    }
}