import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageListOrderedItemText extends TLObject {
    static CONSTRUCTOR_ID = 1577484359;
    static SUBCLASS_OF_ID = 4007268024;
    static className = "PageListOrderedItemText";
    static classType = "constructor";

    num!: string;
    text!: TypeRichText;

    constructor(args: { num?: string, text?: TypeRichText } = {}) {
        super();
        this.num = args.num!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1577484359, false);
        writer.tgWriteString(this.num);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageListOrderedItemText {
        const args: any = {};
        const _num = reader.tgReadString();
        args.num = _num;
        const _text = reader.tgReadObject();
        args.text = _text;
        return new PageListOrderedItemText(args);
    }
}