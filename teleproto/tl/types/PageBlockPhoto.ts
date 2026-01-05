import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockPhoto extends TLObject {
    static CONSTRUCTOR_ID = 391759200;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockPhoto";
    static classType = "constructor";

    flags!: number;
    photoId!: bigint;
    caption!: TypePageCaption;
    url?: string;
    webpageId?: bigint;

    constructor(args: { flags?: number, photoId?: bigint, caption?: TypePageCaption, url?: string, webpageId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.photoId = args.photoId!;
        this.caption = args.caption!;
        this.url = args.url;
        this.webpageId = args.webpageId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(391759200, false);
        let flags = 0;
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 0; }
        if (this.webpageId !== undefined && this.webpageId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.photoId, 64);
        writer.write(this.caption.getBytes());
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        if (this.webpageId !== undefined && this.webpageId !== null) {
            writer.writeLargeInt(this.webpageId, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockPhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _photoId = reader.readLargeInt(64);
        args.photoId = _photoId;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        if (args.flags & (1 << 0)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _webpageId = reader.readLargeInt(64);
            args.webpageId = _webpageId;
        } else {
            args.webpageId = undefined;
        }
        return new PageBlockPhoto(args);
    }
}