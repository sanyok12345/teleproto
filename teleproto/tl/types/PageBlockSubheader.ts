import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageBlockSubheader extends TLObject {
    static CONSTRUCTOR_ID = 4046173921;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockSubheader";
    static classType = "constructor";

    text!: TypeRichText;

    constructor(args: { text?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4046173921, false);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockSubheader {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        return new PageBlockSubheader(args);
    }
}