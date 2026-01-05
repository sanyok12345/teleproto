import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickerSet } from "../../types/TypeInputStickerSet";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class SetStickerSetThumb extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2808763282;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.SetStickerSetThumb";
    static classType = "request";

    flags?: number;
    stickerset!: TypeInputStickerSet;
    thumb?: TypeInputDocument;
    thumbDocumentId?: bigint;

    constructor(args: { flags?: number, stickerset?: TypeInputStickerSet, thumb?: TypeInputDocument, thumbDocumentId?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.stickerset = args.stickerset!;
        this.thumb = args.thumb;
        this.thumbDocumentId = args.thumbDocumentId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2808763282, false);
        let flags = 0;
        if (this.thumb !== undefined && this.thumb !== null) { flags |= 1 << 0; }
        if (this.thumbDocumentId !== undefined && this.thumbDocumentId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.stickerset.getBytes());
        if (this.thumb !== undefined && this.thumb !== null) {
            writer.write(this.thumb.getBytes());
        }
        if (this.thumbDocumentId !== undefined && this.thumbDocumentId !== null) {
            writer.writeLargeInt(this.thumbDocumentId, 64);
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

    static fromReader(reader: BinaryReader): SetStickerSetThumb {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        if (args.flags & (1 << 0)) {
            const _thumb = reader.tgReadObject();
            args.thumb = _thumb;
        } else {
            args.thumb = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _thumbDocumentId = reader.readLargeInt(64);
            args.thumbDocumentId = _thumbDocumentId;
        } else {
            args.thumbDocumentId = undefined;
        }
        return new SetStickerSetThumb(args);
    }
}