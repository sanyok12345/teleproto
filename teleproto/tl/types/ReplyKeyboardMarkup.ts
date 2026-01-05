import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeKeyboardButtonRow } from "./TypeKeyboardButtonRow";

export class ReplyKeyboardMarkup extends TLObject {
    static CONSTRUCTOR_ID = 2245892561;
    static SUBCLASS_OF_ID = 3806400242;
    static className = "ReplyKeyboardMarkup";
    static classType = "constructor";

    flags!: number;
    resize?: boolean;
    singleUse?: boolean;
    selective?: boolean;
    persistent?: boolean;
    rows!: TypeKeyboardButtonRow[];
    placeholder?: string;

    constructor(args: { flags?: number, resize?: boolean, singleUse?: boolean, selective?: boolean, persistent?: boolean, rows?: TypeKeyboardButtonRow[], placeholder?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.resize = args.resize;
        this.singleUse = args.singleUse;
        this.selective = args.selective;
        this.persistent = args.persistent;
        this.rows = args.rows!;
        this.placeholder = args.placeholder;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2245892561, false);
        let flags = 0;
        if (this.resize) { flags |= 1 << 0; }
        if (this.singleUse) { flags |= 1 << 1; }
        if (this.selective) { flags |= 1 << 2; }
        if (this.persistent) { flags |= 1 << 4; }
        if (this.placeholder !== undefined && this.placeholder !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.resize !== undefined && this.resize !== null) {
        }
        if (this.singleUse !== undefined && this.singleUse !== null) {
        }
        if (this.selective !== undefined && this.selective !== null) {
        }
        if (this.persistent !== undefined && this.persistent !== null) {
        }
        writer.writeVector(this.rows, (item) => {
            writer.write(item.getBytes());
        });
        if (this.placeholder !== undefined && this.placeholder !== null) {
            writer.tgWriteString(this.placeholder);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReplyKeyboardMarkup {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _resize = true;
            args.resize = _resize;
        } else {
            args.resize = false;
        }
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
        if (args.flags & (1 << 4)) {
            const _persistent = true;
            args.persistent = _persistent;
        } else {
            args.persistent = false;
        }
        const _rows = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rows = _rows;
        if (args.flags & (1 << 3)) {
            const _placeholder = reader.tgReadString();
            args.placeholder = _placeholder;
        } else {
            args.placeholder = undefined;
        }
        return new ReplyKeyboardMarkup(args);
    }
}