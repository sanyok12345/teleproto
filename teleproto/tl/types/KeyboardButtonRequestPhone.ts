import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonRequestPhone extends TLObject {
    static CONSTRUCTOR_ID = 2976541737;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonRequestPhone";
    static classType = "constructor";

    text!: string;

    constructor(args: { text?: string } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2976541737, false);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonRequestPhone {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        return new KeyboardButtonRequestPhone(args);
    }
}