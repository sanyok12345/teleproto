import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PageRelatedArticle extends TLObject {
    static CONSTRUCTOR_ID = 3012615176;
    static SUBCLASS_OF_ID = 919623714;
    static className = "PageRelatedArticle";
    static classType = "constructor";

    flags!: number;
    url!: string;
    webpageId!: bigint;
    title?: string;
    description?: string;
    photoId?: bigint;
    author?: string;
    publishedDate?: number;

    constructor(args: { flags?: number, url?: string, webpageId?: bigint, title?: string, description?: string, photoId?: bigint, author?: string, publishedDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.url = args.url!;
        this.webpageId = args.webpageId!;
        this.title = args.title;
        this.description = args.description;
        this.photoId = args.photoId;
        this.author = args.author;
        this.publishedDate = args.publishedDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3012615176, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 1; }
        if (this.photoId !== undefined && this.photoId !== null) { flags |= 1 << 2; }
        if (this.author !== undefined && this.author !== null) { flags |= 1 << 3; }
        if (this.publishedDate !== undefined && this.publishedDate !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.webpageId, 64);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        if (this.photoId !== undefined && this.photoId !== null) {
            writer.writeLargeInt(this.photoId, 64);
        }
        if (this.author !== undefined && this.author !== null) {
            writer.tgWriteString(this.author);
        }
        if (this.publishedDate !== undefined && this.publishedDate !== null) {
            writer.writeInt(this.publishedDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageRelatedArticle {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _url = reader.tgReadString();
        args.url = _url;
        const _webpageId = reader.readLargeInt(64);
        args.webpageId = _webpageId;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _photoId = reader.readLargeInt(64);
            args.photoId = _photoId;
        } else {
            args.photoId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _author = reader.tgReadString();
            args.author = _author;
        } else {
            args.author = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _publishedDate = reader.readInt();
            args.publishedDate = _publishedDate;
        } else {
            args.publishedDate = undefined;
        }
        return new PageRelatedArticle(args);
    }
}