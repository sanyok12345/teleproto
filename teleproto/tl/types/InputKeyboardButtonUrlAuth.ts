import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputKeyboardButtonUrlAuth extends TLObject {
    static CONSTRUCTOR_ID = 3492708308;
    static SUBCLASS_OF_ID = 195916963;
    static className = "InputKeyboardButtonUrlAuth";
    static classType = "constructor";

    flags!: number;
    requestWriteAccess?: boolean;
    text!: string;
    fwdText?: string;
    url!: string;
    bot!: TypeInputUser;

    constructor(args: { flags?: number, requestWriteAccess?: boolean, text?: string, fwdText?: string, url?: string, bot?: TypeInputUser } = {}) {
        super();
        this.flags = args.flags!;
        this.requestWriteAccess = args.requestWriteAccess;
        this.text = args.text!;
        this.fwdText = args.fwdText;
        this.url = args.url!;
        this.bot = args.bot!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3492708308, false);
        let flags = 0;
        if (this.requestWriteAccess) { flags |= 1 << 0; }
        if (this.fwdText !== undefined && this.fwdText !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.requestWriteAccess !== undefined && this.requestWriteAccess !== null) {
        }
        writer.tgWriteString(this.text);
        if (this.fwdText !== undefined && this.fwdText !== null) {
            writer.tgWriteString(this.fwdText);
        }
        writer.tgWriteString(this.url);
        writer.write(this.bot.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputKeyboardButtonUrlAuth {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _requestWriteAccess = true;
            args.requestWriteAccess = _requestWriteAccess;
        } else {
            args.requestWriteAccess = false;
        }
        const _text = reader.tgReadString();
        args.text = _text;
        if (args.flags & (1 << 1)) {
            const _fwdText = reader.tgReadString();
            args.fwdText = _fwdText;
        } else {
            args.fwdText = undefined;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new InputKeyboardButtonUrlAuth(args);
    }
}