import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextEmail extends TLObject {
    static CONSTRUCTOR_ID = 3730443734;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextEmail";
    static classType = "constructor";

    text!: TypeRichText;
    email!: string;

    constructor(args: { text?: TypeRichText, email?: string } = {}) {
        super();
        this.text = args.text!;
        this.email = args.email!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3730443734, false);
        writer.write(this.text.getBytes());
        writer.tgWriteString(this.email);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextEmail {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _email = reader.tgReadString();
        args.email = _email;
        return new TextEmail(args);
    }
}