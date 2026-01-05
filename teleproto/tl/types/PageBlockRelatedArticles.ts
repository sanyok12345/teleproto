import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";
import { TypePageRelatedArticle } from "./TypePageRelatedArticle";

export class PageBlockRelatedArticles extends TLObject {
    static CONSTRUCTOR_ID = 370236054;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockRelatedArticles";
    static classType = "constructor";

    title!: TypeRichText;
    articles!: TypePageRelatedArticle[];

    constructor(args: { title?: TypeRichText, articles?: TypePageRelatedArticle[] } = {}) {
        super();
        this.title = args.title!;
        this.articles = args.articles!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(370236054, false);
        writer.write(this.title.getBytes());
        writer.writeVector(this.articles, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockRelatedArticles {
        const args: any = {};
        const _title = reader.tgReadObject();
        args.title = _title;
        const _articles = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.articles = _articles;
        return new PageBlockRelatedArticles(args);
    }
}