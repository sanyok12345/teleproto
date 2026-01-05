import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReplyKeyboardHide extends TLObject {
    static CONSTRUCTOR_ID = 2688441221;
    static SUBCLASS_OF_ID = 3806400242;
    static className = "ReplyKeyboardHide";
    static classType = "constructor";

    flags!: number;
    selective?: boolean;

    constructor(args: { flags?: number, selective?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.selective = args.selective;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2688441221, false);
        let flags = 0;
        if (this.selective) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.selective !== undefined && this.selective !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReplyKeyboardHide {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _selective = true;
            args.selective = _selective;
        } else {
            args.selective = false;
        }
        return new ReplyKeyboardHide(args);
    }
}