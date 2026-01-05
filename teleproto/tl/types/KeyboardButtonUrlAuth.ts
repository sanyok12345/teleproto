import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonUrlAuth extends TLObject {
    static CONSTRUCTOR_ID = 280464681;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonUrlAuth";
    static classType = "constructor";

    flags!: number;
    text!: string;
    fwdText?: string;
    url!: string;
    buttonId!: number;

    constructor(args: { flags?: number, text?: string, fwdText?: string, url?: string, buttonId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.text = args.text!;
        this.fwdText = args.fwdText;
        this.url = args.url!;
        this.buttonId = args.buttonId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(280464681, false);
        let flags = 0;
        if (this.fwdText !== undefined && this.fwdText !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.text);
        if (this.fwdText !== undefined && this.fwdText !== null) {
            writer.tgWriteString(this.fwdText);
        }
        writer.tgWriteString(this.url);
        writer.writeInt(this.buttonId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonUrlAuth {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _text = reader.tgReadString();
        args.text = _text;
        if (args.flags & (1 << 0)) {
            const _fwdText = reader.tgReadString();
            args.fwdText = _fwdText;
        } else {
            args.fwdText = undefined;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        const _buttonId = reader.readInt();
        args.buttonId = _buttonId;
        return new KeyboardButtonUrlAuth(args);
    }
}