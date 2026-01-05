import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageBlockKicker extends TLObject {
    static CONSTRUCTOR_ID = 504660880;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockKicker";
    static classType = "constructor";

    text!: TypeRichText;

    constructor(args: { text?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(504660880, false);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockKicker {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        return new PageBlockKicker(args);
    }
}