import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextAnchor extends TLObject {
    static CONSTRUCTOR_ID = 894777186;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextAnchor";
    static classType = "constructor";

    text!: TypeRichText;
    name!: string;

    constructor(args: { text?: TypeRichText, name?: string } = {}) {
        super();
        this.text = args.text!;
        this.name = args.name!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(894777186, false);
        writer.write(this.text.getBytes());
        writer.tgWriteString(this.name);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextAnchor {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _name = reader.tgReadString();
        args.name = _name;
        return new TextAnchor(args);
    }
}