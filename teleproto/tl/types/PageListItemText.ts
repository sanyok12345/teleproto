import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageListItemText extends TLObject {
    static CONSTRUCTOR_ID = 3106911949;
    static SUBCLASS_OF_ID = 2360261809;
    static className = "PageListItemText";
    static classType = "constructor";

    text!: TypeRichText;

    constructor(args: { text?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3106911949, false);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageListItemText {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        return new PageListItemText(args);
    }
}