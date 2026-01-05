import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonCallback extends TLObject {
    static CONSTRUCTOR_ID = 901503851;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonCallback";
    static classType = "constructor";

    flags!: number;
    requiresPassword?: boolean;
    text!: string;
    data!: Buffer;

    constructor(args: { flags?: number, requiresPassword?: boolean, text?: string, data?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.requiresPassword = args.requiresPassword;
        this.text = args.text!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(901503851, false);
        let flags = 0;
        if (this.requiresPassword) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.requiresPassword !== undefined && this.requiresPassword !== null) {
        }
        writer.tgWriteString(this.text);
        writer.tgWriteBytes(this.data);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonCallback {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _requiresPassword = true;
            args.requiresPassword = _requiresPassword;
        } else {
            args.requiresPassword = false;
        }
        const _text = reader.tgReadString();
        args.text = _text;
        const _data = reader.tgReadBytes();
        args.data = _data;
        return new KeyboardButtonCallback(args);
    }
}