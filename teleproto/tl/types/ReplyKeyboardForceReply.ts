import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReplyKeyboardForceReply extends TLObject {
    static CONSTRUCTOR_ID = 2259946248;
    static SUBCLASS_OF_ID = 3806400242;
    static className = "ReplyKeyboardForceReply";
    static classType = "constructor";

    flags!: number;
    singleUse?: boolean;
    selective?: boolean;
    placeholder?: string;

    constructor(args: { flags?: number, singleUse?: boolean, selective?: boolean, placeholder?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.singleUse = args.singleUse;
        this.selective = args.selective;
        this.placeholder = args.placeholder;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2259946248, false);
        let flags = 0;
        if (this.singleUse) { flags |= 1 << 1; }
        if (this.selective) { flags |= 1 << 2; }
        if (this.placeholder !== undefined && this.placeholder !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.singleUse !== undefined && this.singleUse !== null) {
        }
        if (this.selective !== undefined && this.selective !== null) {
        }
        if (this.placeholder !== undefined && this.placeholder !== null) {
            writer.tgWriteString(this.placeholder);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReplyKeyboardForceReply {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _singleUse = true;
            args.singleUse = _singleUse;
        } else {
            args.singleUse = false;
        }
        if (args.flags & (1 << 2)) {
            const _selective = true;
            args.selective = _selective;
        } else {
            args.selective = false;
        }
        if (args.flags & (1 << 3)) {
            const _placeholder = reader.tgReadString();
            args.placeholder = _placeholder;
        } else {
            args.placeholder = undefined;
        }
        return new ReplyKeyboardForceReply(args);
    }
}