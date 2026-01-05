import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonCopy extends TLObject {
    static CONSTRUCTOR_ID = 1976723854;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonCopy";
    static classType = "constructor";

    text!: string;
    copyText!: string;

    constructor(args: { text?: string, copyText?: string } = {}) {
        super();
        this.text = args.text!;
        this.copyText = args.copyText!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1976723854, false);
        writer.tgWriteString(this.text);
        writer.tgWriteString(this.copyText);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonCopy {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _copyText = reader.tgReadString();
        args.copyText = _copyText;
        return new KeyboardButtonCopy(args);
    }
}