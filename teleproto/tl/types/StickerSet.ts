import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhotoSize } from "./TypePhotoSize";

export class StickerSet extends TLObject {
    static CONSTRUCTOR_ID = 768691932;
    static SUBCLASS_OF_ID = 3134455697;
    static className = "StickerSet";
    static classType = "constructor";

    flags!: number;
    archived?: boolean;
    official?: boolean;
    masks?: boolean;
    emojis?: boolean;
    textColor?: boolean;
    channelEmojiStatus?: boolean;
    creator?: boolean;
    installedDate?: number;
    id!: bigint;
    accessHash!: bigint;
    title!: string;
    shortName!: string;
    thumbs?: TypePhotoSize[];
    thumbDcId?: number;
    thumbVersion?: number;
    thumbDocumentId?: bigint;
    count!: number;
    hash!: number;

    constructor(args: { flags?: number, archived?: boolean, official?: boolean, masks?: boolean, emojis?: boolean, textColor?: boolean, channelEmojiStatus?: boolean, creator?: boolean, installedDate?: number, id?: bigint, accessHash?: bigint, title?: string, shortName?: string, thumbs?: TypePhotoSize[], thumbDcId?: number, thumbVersion?: number, thumbDocumentId?: bigint, count?: number, hash?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.archived = args.archived;
        this.official = args.official;
        this.masks = args.masks;
        this.emojis = args.emojis;
        this.textColor = args.textColor;
        this.channelEmojiStatus = args.channelEmojiStatus;
        this.creator = args.creator;
        this.installedDate = args.installedDate;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.title = args.title!;
        this.shortName = args.shortName!;
        this.thumbs = args.thumbs;
        this.thumbDcId = args.thumbDcId;
        this.thumbVersion = args.thumbVersion;
        this.thumbDocumentId = args.thumbDocumentId;
        this.count = args.count!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(768691932, false);
        let flags = 0;
        if (this.archived) { flags |= 1 << 1; }
        if (this.official) { flags |= 1 << 2; }
        if (this.masks) { flags |= 1 << 3; }
        if (this.emojis) { flags |= 1 << 7; }
        if (this.textColor) { flags |= 1 << 9; }
        if (this.channelEmojiStatus) { flags |= 1 << 10; }
        if (this.creator) { flags |= 1 << 11; }
        if (this.installedDate !== undefined && this.installedDate !== null) { flags |= 1 << 0; }
        if (this.thumbs !== undefined && this.thumbs !== null) { flags |= 1 << 4; }
        if (this.thumbDcId !== undefined && this.thumbDcId !== null) { flags |= 1 << 4; }
        if (this.thumbVersion !== undefined && this.thumbVersion !== null) { flags |= 1 << 4; }
        if (this.thumbDocumentId !== undefined && this.thumbDocumentId !== null) { flags |= 1 << 8; }
        writer.writeInt(flags, false);
        if (this.archived !== undefined && this.archived !== null) {
        }
        if (this.official !== undefined && this.official !== null) {
        }
        if (this.masks !== undefined && this.masks !== null) {
        }
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        if (this.textColor !== undefined && this.textColor !== null) {
        }
        if (this.channelEmojiStatus !== undefined && this.channelEmojiStatus !== null) {
        }
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.installedDate !== undefined && this.installedDate !== null) {
            writer.writeInt(this.installedDate);
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.shortName);
        if (this.thumbs !== undefined && this.thumbs !== null) {
            writer.writeVector(this.thumbs, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.thumbDcId !== undefined && this.thumbDcId !== null) {
            writer.writeInt(this.thumbDcId);
        }
        if (this.thumbVersion !== undefined && this.thumbVersion !== null) {
            writer.writeInt(this.thumbVersion);
        }
        if (this.thumbDocumentId !== undefined && this.thumbDocumentId !== null) {
            writer.writeLargeInt(this.thumbDocumentId, 64);
        }
        writer.writeInt(this.count);
        writer.writeInt(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSet {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _archived = true;
            args.archived = _archived;
        } else {
            args.archived = false;
        }
        if (args.flags & (1 << 2)) {
            const _official = true;
            args.official = _official;
        } else {
            args.official = false;
        }
        if (args.flags & (1 << 3)) {
            const _masks = true;
            args.masks = _masks;
        } else {
            args.masks = false;
        }
        if (args.flags & (1 << 7)) {
            const _emojis = true;
            args.emojis = _emojis;
        } else {
            args.emojis = false;
        }
        if (args.flags & (1 << 9)) {
            const _textColor = true;
            args.textColor = _textColor;
        } else {
            args.textColor = false;
        }
        if (args.flags & (1 << 10)) {
            const _channelEmojiStatus = true;
            args.channelEmojiStatus = _channelEmojiStatus;
        } else {
            args.channelEmojiStatus = false;
        }
        if (args.flags & (1 << 11)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 0)) {
            const _installedDate = reader.readInt();
            args.installedDate = _installedDate;
        } else {
            args.installedDate = undefined;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _title = reader.tgReadString();
        args.title = _title;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        if (args.flags & (1 << 4)) {
            const _thumbs = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.thumbs = _thumbs;
        } else {
            args.thumbs = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _thumbDcId = reader.readInt();
            args.thumbDcId = _thumbDcId;
        } else {
            args.thumbDcId = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _thumbVersion = reader.readInt();
            args.thumbVersion = _thumbVersion;
        } else {
            args.thumbVersion = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _thumbDocumentId = reader.readLargeInt(64);
            args.thumbDocumentId = _thumbDocumentId;
        } else {
            args.thumbDocumentId = undefined;
        }
        const _count = reader.readInt();
        args.count = _count;
        const _hash = reader.readInt();
        args.hash = _hash;
        return new StickerSet(args);
    }
}