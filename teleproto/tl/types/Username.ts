import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Username extends TLObject {
    static CONSTRUCTOR_ID = 3020371527;
    static SUBCLASS_OF_ID = 19424289;
    static className = "Username";
    static classType = "constructor";

    flags!: number;
    editable?: boolean;
    active?: boolean;
    username!: string;

    constructor(args: { flags?: number, editable?: boolean, active?: boolean, username?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.editable = args.editable;
        this.active = args.active;
        this.username = args.username!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3020371527, false);
        let flags = 0;
        if (this.editable) { flags |= 1 << 0; }
        if (this.active) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.editable !== undefined && this.editable !== null) {
        }
        if (this.active !== undefined && this.active !== null) {
        }
        writer.tgWriteString(this.username);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Username {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _editable = true;
            args.editable = _editable;
        } else {
            args.editable = false;
        }
        if (args.flags & (1 << 1)) {
            const _active = true;
            args.active = _active;
        } else {
            args.active = false;
        }
        const _username = reader.tgReadString();
        args.username = _username;
        return new Username(args);
    }
}