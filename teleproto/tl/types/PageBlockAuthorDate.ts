import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageBlockAuthorDate extends TLObject {
    static CONSTRUCTOR_ID = 3132089824;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockAuthorDate";
    static classType = "constructor";

    author!: TypeRichText;
    publishedDate!: number;

    constructor(args: { author?: TypeRichText, publishedDate?: number } = {}) {
        super();
        this.author = args.author!;
        this.publishedDate = args.publishedDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3132089824, false);
        writer.write(this.author.getBytes());
        writer.writeInt(this.publishedDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockAuthorDate {
        const args: any = {};
        const _author = reader.tgReadObject();
        args.author = _author;
        const _publishedDate = reader.readInt();
        args.publishedDate = _publishedDate;
        return new PageBlockAuthorDate(args);
    }
}