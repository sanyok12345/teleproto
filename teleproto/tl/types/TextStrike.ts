import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextStrike extends TLObject {
    static CONSTRUCTOR_ID = 2616769429;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextStrike";
    static classType = "constructor";

    text!: TypeRichText;

    constructor(args: { text?: TypeRichText } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2616769429, false);
        writer.write(this.text.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextStrike {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        return new TextStrike(args);
    }
}