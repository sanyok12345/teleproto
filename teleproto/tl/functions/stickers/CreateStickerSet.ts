import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputDocument } from "../../types/TypeInputDocument";
import { TypeInputStickerSetItem } from "../../types/TypeInputStickerSetItem";
import { TypeStickerSet } from "../../types/messages/TypeStickerSet";

export class CreateStickerSet extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2418125671;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "stickers.CreateStickerSet";
    static classType = "request";

    flags?: number;
    masks?: boolean;
    emojis?: boolean;
    textColor?: boolean;
    userId!: EntityLike;
    title!: string;
    shortName!: string;
    thumb?: TypeInputDocument;
    stickers!: TypeInputStickerSetItem[];
    software?: string;

    constructor(args: { flags?: number, masks?: boolean, emojis?: boolean, textColor?: boolean, userId?: EntityLike, title?: string, shortName?: string, thumb?: TypeInputDocument, stickers?: TypeInputStickerSetItem[], software?: string } = {}) {
        super();
        this.flags = args.flags;
        this.masks = args.masks;
        this.emojis = args.emojis;
        this.textColor = args.textColor;
        this.userId = args.userId!;
        this.title = args.title!;
        this.shortName = args.shortName!;
        this.thumb = args.thumb;
        this.stickers = args.stickers!;
        this.software = args.software;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2418125671, false);
        let flags = 0;
        if (this.masks) { flags |= 1 << 0; }
        if (this.emojis) { flags |= 1 << 5; }
        if (this.textColor) { flags |= 1 << 6; }
        if (this.thumb !== undefined && this.thumb !== null) { flags |= 1 << 2; }
        if (this.software !== undefined && this.software !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.masks !== undefined && this.masks !== null) {
        }
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        if (this.textColor !== undefined && this.textColor !== null) {
        }
        writer.write((this.userId as any).getBytes());
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.shortName);
        if (this.thumb !== undefined && this.thumb !== null) {
            writer.write(this.thumb.getBytes());
        }
        writer.writeVector(this.stickers, (item) => {
            writer.write(item.getBytes());
        });
        if (this.software !== undefined && this.software !== null) {
            writer.tgWriteString(this.software);
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

    static fromReader(reader: BinaryReader): CreateStickerSet {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _masks = true;
            args.masks = _masks;
        } else {
            args.masks = false;
        }
        if (args.flags & (1 << 5)) {
            const _emojis = true;
            args.emojis = _emojis;
        } else {
            args.emojis = false;
        }
        if (args.flags & (1 << 6)) {
            const _textColor = true;
            args.textColor = _textColor;
        } else {
            args.textColor = false;
        }
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _title = reader.tgReadString();
        args.title = _title;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        if (args.flags & (1 << 2)) {
            const _thumb = reader.tgReadObject();
            args.thumb = _thumb;
        } else {
            args.thumb = undefined;
        }
        const _stickers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stickers = _stickers;
        if (args.flags & (1 << 3)) {
            const _software = reader.tgReadString();
            args.software = _software;
        } else {
            args.software = undefined;
        }
        return new CreateStickerSet(args);
    }
}