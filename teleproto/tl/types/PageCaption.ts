import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageCaption extends TLObject {
    static CONSTRUCTOR_ID = 1869903447;
    static SUBCLASS_OF_ID = 699985587;
    static className = "PageCaption";
    static classType = "constructor";

    text!: TypeRichText;
    credit!: TypeRichText;

    constructor(args: { text?: TypeRichText, credit?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
        this.credit = args.credit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1869903447, false);
        writer.write(this.text.getBytes());
        writer.write(this.credit.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageCaption {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _credit = reader.tgReadObject();
        args.credit = _credit;
        return new PageCaption(args);
    }
}