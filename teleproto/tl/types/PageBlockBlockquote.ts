import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageBlockBlockquote extends TLObject {
    static CONSTRUCTOR_ID = 641563686;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockBlockquote";
    static classType = "constructor";

    text!: TypeRichText;
    caption!: TypeRichText;

    constructor(args: { text?: TypeRichText, caption?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(641563686, false);
        writer.write(this.text.getBytes());
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockBlockquote {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockBlockquote(args);
    }
}