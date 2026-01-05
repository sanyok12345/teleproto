import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButton extends TLObject {
    static CONSTRUCTOR_ID = 2734311552;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButton";
    static classType = "constructor";

    text!: string;

    constructor(args: { text?: string } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2734311552, false);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButton {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        return new KeyboardButton(args);
    }
}