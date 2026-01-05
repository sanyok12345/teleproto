import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TextPlain extends TLObject {
    static CONSTRUCTOR_ID = 1950782688;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextPlain";
    static classType = "constructor";

    text!: string;

    constructor(args: { text?: string } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1950782688, false);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextPlain {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        return new TextPlain(args);
    }
}