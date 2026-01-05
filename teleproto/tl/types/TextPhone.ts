import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextPhone extends TLObject {
    static CONSTRUCTOR_ID = 483104362;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextPhone";
    static classType = "constructor";

    text!: TypeRichText;
    phone!: string;

    constructor(args: { text?: TypeRichText, phone?: string } = {}) {
        super();
        this.text = args.text!;
        this.phone = args.phone!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(483104362, false);
        writer.write(this.text.getBytes());
        writer.tgWriteString(this.phone);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextPhone {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _phone = reader.tgReadString();
        args.phone = _phone;
        return new TextPhone(args);
    }
}