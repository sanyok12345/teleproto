import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockEmbed extends TLObject {
    static CONSTRUCTOR_ID = 2826014149;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockEmbed";
    static classType = "constructor";

    flags!: number;
    fullWidth?: boolean;
    allowScrolling?: boolean;
    url?: string;
    html?: string;
    posterPhotoId?: bigint;
    w?: number;
    h?: number;
    caption!: TypePageCaption;

    constructor(args: { flags?: number, fullWidth?: boolean, allowScrolling?: boolean, url?: string, html?: string, posterPhotoId?: bigint, w?: number, h?: number, caption?: TypePageCaption } = {}) {
        super();
        this.flags = args.flags!;
        this.fullWidth = args.fullWidth;
        this.allowScrolling = args.allowScrolling;
        this.url = args.url;
        this.html = args.html;
        this.posterPhotoId = args.posterPhotoId;
        this.w = args.w;
        this.h = args.h;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2826014149, false);
        let flags = 0;
        if (this.fullWidth) { flags |= 1 << 0; }
        if (this.allowScrolling) { flags |= 1 << 3; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 1; }
        if (this.html !== undefined && this.html !== null) { flags |= 1 << 2; }
        if (this.posterPhotoId !== undefined && this.posterPhotoId !== null) { flags |= 1 << 4; }
        if (this.w !== undefined && this.w !== null) { flags |= 1 << 5; }
        if (this.h !== undefined && this.h !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.fullWidth !== undefined && this.fullWidth !== null) {
        }
        if (this.allowScrolling !== undefined && this.allowScrolling !== null) {
        }
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        if (this.html !== undefined && this.html !== null) {
            writer.tgWriteString(this.html);
        }
        if (this.posterPhotoId !== undefined && this.posterPhotoId !== null) {
            writer.writeLargeInt(this.posterPhotoId, 64);
        }
        if (this.w !== undefined && this.w !== null) {
            writer.writeInt(this.w);
        }
        if (this.h !== undefined && this.h !== null) {
            writer.writeInt(this.h);
        }
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockEmbed {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _fullWidth = true;
            args.fullWidth = _fullWidth;
        } else {
            args.fullWidth = false;
        }
        if (args.flags & (1 << 3)) {
            const _allowScrolling = true;
            args.allowScrolling = _allowScrolling;
        } else {
            args.allowScrolling = false;
        }
        if (args.flags & (1 << 1)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _html = reader.tgReadString();
            args.html = _html;
        } else {
            args.html = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _posterPhotoId = reader.readLargeInt(64);
            args.posterPhotoId = _posterPhotoId;
        } else {
            args.posterPhotoId = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _w = reader.readInt();
            args.w = _w;
        } else {
            args.w = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _h = reader.readInt();
            args.h = _h;
        } else {
            args.h = undefined;
        }
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockEmbed(args);
    }
}