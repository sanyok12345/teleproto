import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypeDocument } from "./TypeDocument";
import { TypePage } from "./TypePage";
import { TypeWebPageAttribute } from "./TypeWebPageAttribute";

export class WebPage extends TLObject {
    static CONSTRUCTOR_ID = 3902555570;
    static SUBCLASS_OF_ID = 1437168769;
    static className = "WebPage";
    static classType = "constructor";

    flags!: number;
    hasLargeMedia?: boolean;
    videoCoverPhoto?: boolean;
    id!: bigint;
    url!: string;
    displayUrl!: string;
    hash!: number;
    type?: string;
    siteName?: string;
    title?: string;
    description?: string;
    photo?: TypePhoto;
    embedUrl?: string;
    embedType?: string;
    embedWidth?: number;
    embedHeight?: number;
    duration?: number;
    author?: string;
    document?: TypeDocument;
    cachedPage?: TypePage;
    attributes?: TypeWebPageAttribute[];

    constructor(args: { flags?: number, hasLargeMedia?: boolean, videoCoverPhoto?: boolean, id?: bigint, url?: string, displayUrl?: string, hash?: number, type?: string, siteName?: string, title?: string, description?: string, photo?: TypePhoto, embedUrl?: string, embedType?: string, embedWidth?: number, embedHeight?: number, duration?: number, author?: string, document?: TypeDocument, cachedPage?: TypePage, attributes?: TypeWebPageAttribute[] } = {}) {
        super();
        this.flags = args.flags!;
        this.hasLargeMedia = args.hasLargeMedia;
        this.videoCoverPhoto = args.videoCoverPhoto;
        this.id = args.id!;
        this.url = args.url!;
        this.displayUrl = args.displayUrl!;
        this.hash = args.hash!;
        this.type = args.type;
        this.siteName = args.siteName;
        this.title = args.title;
        this.description = args.description;
        this.photo = args.photo;
        this.embedUrl = args.embedUrl;
        this.embedType = args.embedType;
        this.embedWidth = args.embedWidth;
        this.embedHeight = args.embedHeight;
        this.duration = args.duration;
        this.author = args.author;
        this.document = args.document;
        this.cachedPage = args.cachedPage;
        this.attributes = args.attributes;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3902555570, false);
        let flags = 0;
        if (this.hasLargeMedia) { flags |= 1 << 13; }
        if (this.videoCoverPhoto) { flags |= 1 << 14; }
        if (this.type !== undefined && this.type !== null) { flags |= 1 << 0; }
        if (this.siteName !== undefined && this.siteName !== null) { flags |= 1 << 1; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 2; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 3; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 4; }
        if (this.embedUrl !== undefined && this.embedUrl !== null) { flags |= 1 << 5; }
        if (this.embedType !== undefined && this.embedType !== null) { flags |= 1 << 5; }
        if (this.embedWidth !== undefined && this.embedWidth !== null) { flags |= 1 << 6; }
        if (this.embedHeight !== undefined && this.embedHeight !== null) { flags |= 1 << 6; }
        if (this.duration !== undefined && this.duration !== null) { flags |= 1 << 7; }
        if (this.author !== undefined && this.author !== null) { flags |= 1 << 8; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 9; }
        if (this.cachedPage !== undefined && this.cachedPage !== null) { flags |= 1 << 10; }
        if (this.attributes !== undefined && this.attributes !== null) { flags |= 1 << 12; }
        writer.writeInt(flags, false);
        if (this.hasLargeMedia !== undefined && this.hasLargeMedia !== null) {
        }
        if (this.videoCoverPhoto !== undefined && this.videoCoverPhoto !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.url);
        writer.tgWriteString(this.displayUrl);
        writer.writeInt(this.hash);
        if (this.type !== undefined && this.type !== null) {
            writer.tgWriteString(this.type);
        }
        if (this.siteName !== undefined && this.siteName !== null) {
            writer.tgWriteString(this.siteName);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.embedUrl !== undefined && this.embedUrl !== null) {
            writer.tgWriteString(this.embedUrl);
        }
        if (this.embedType !== undefined && this.embedType !== null) {
            writer.tgWriteString(this.embedType);
        }
        if (this.embedWidth !== undefined && this.embedWidth !== null) {
            writer.writeInt(this.embedWidth);
        }
        if (this.embedHeight !== undefined && this.embedHeight !== null) {
            writer.writeInt(this.embedHeight);
        }
        if (this.duration !== undefined && this.duration !== null) {
            writer.writeInt(this.duration);
        }
        if (this.author !== undefined && this.author !== null) {
            writer.tgWriteString(this.author);
        }
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.cachedPage !== undefined && this.cachedPage !== null) {
            writer.write(this.cachedPage.getBytes());
        }
        if (this.attributes !== undefined && this.attributes !== null) {
            writer.writeVector(this.attributes, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 13)) {
            const _hasLargeMedia = true;
            args.hasLargeMedia = _hasLargeMedia;
        } else {
            args.hasLargeMedia = false;
        }
        if (args.flags & (1 << 14)) {
            const _videoCoverPhoto = true;
            args.videoCoverPhoto = _videoCoverPhoto;
        } else {
            args.videoCoverPhoto = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _url = reader.tgReadString();
        args.url = _url;
        const _displayUrl = reader.tgReadString();
        args.displayUrl = _displayUrl;
        const _hash = reader.readInt();
        args.hash = _hash;
        if (args.flags & (1 << 0)) {
            const _type = reader.tgReadString();
            args.type = _type;
        } else {
            args.type = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _siteName = reader.tgReadString();
            args.siteName = _siteName;
        } else {
            args.siteName = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _embedUrl = reader.tgReadString();
            args.embedUrl = _embedUrl;
        } else {
            args.embedUrl = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _embedType = reader.tgReadString();
            args.embedType = _embedType;
        } else {
            args.embedType = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _embedWidth = reader.readInt();
            args.embedWidth = _embedWidth;
        } else {
            args.embedWidth = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _embedHeight = reader.readInt();
            args.embedHeight = _embedHeight;
        } else {
            args.embedHeight = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _duration = reader.readInt();
            args.duration = _duration;
        } else {
            args.duration = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _author = reader.tgReadString();
            args.author = _author;
        } else {
            args.author = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _cachedPage = reader.tgReadObject();
            args.cachedPage = _cachedPage;
        } else {
            args.cachedPage = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _attributes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.attributes = _attributes;
        } else {
            args.attributes = undefined;
        }
        return new WebPage(args);
    }
}