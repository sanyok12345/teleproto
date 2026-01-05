import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextBold extends TLObject {
    static CONSTRUCTOR_ID = 1730456516;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextBold";
    static classType = "constructor";

    text!: TypeRichText;

    constructor(args: { text?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1730456516, false);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextBold {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        return new TextBold(args);
    }
}