import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockEmbedPost extends TLObject {
    static CONSTRUCTOR_ID = 4065961995;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockEmbedPost";
    static classType = "constructor";

    url!: string;
    webpageId!: bigint;
    authorPhotoId!: bigint;
    author!: string;
    date!: number;
    blocks!: TypePageBlock[];
    caption!: TypePageCaption;

    constructor(args: { url?: string, webpageId?: bigint, authorPhotoId?: bigint, author?: string, date?: number, blocks?: TypePageBlock[], caption?: TypePageCaption } = {}) {
        super();
        this.url = args.url!;
        this.webpageId = args.webpageId!;
        this.authorPhotoId = args.authorPhotoId!;
        this.author = args.author!;
        this.date = args.date!;
        this.blocks = args.blocks!;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4065961995, false);
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.webpageId, 64);
        writer.writeLargeInt(this.authorPhotoId, 64);
        writer.tgWriteString(this.author);
        writer.writeInt(this.date);
        writer.writeVector(this.blocks, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockEmbedPost {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _webpageId = reader.readLargeInt(64);
        args.webpageId = _webpageId;
        const _authorPhotoId = reader.readLargeInt(64);
        args.authorPhotoId = _authorPhotoId;
        const _author = reader.tgReadString();
        args.author = _author;
        const _date = reader.readInt();
        args.date = _date;
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocks = _blocks;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockEmbedPost(args);
    }
}