import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StoryItemSkipped extends TLObject {
    static CONSTRUCTOR_ID = 4289579283;
    static SUBCLASS_OF_ID = 3564613939;
    static className = "StoryItemSkipped";
    static classType = "constructor";

    flags!: number;
    closeFriends?: boolean;
    live?: boolean;
    id!: number;
    date!: number;
    expireDate!: number;

    constructor(args: { flags?: number, closeFriends?: boolean, live?: boolean, id?: number, date?: number, expireDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.closeFriends = args.closeFriends;
        this.live = args.live;
        this.id = args.id!;
        this.date = args.date!;
        this.expireDate = args.expireDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4289579283, false);
        let flags = 0;
        if (this.closeFriends) { flags |= 1 << 8; }
        if (this.live) { flags |= 1 << 9; }
        writer.writeInt(flags, false);
        if (this.closeFriends !== undefined && this.closeFriends !== null) {
        }
        if (this.live !== undefined && this.live !== null) {
        }
        writer.writeInt(this.id);
        writer.writeInt(this.date);
        writer.writeInt(this.expireDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryItemSkipped {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 8)) {
            const _closeFriends = true;
            args.closeFriends = _closeFriends;
        } else {
            args.closeFriends = false;
        }
        if (args.flags & (1 << 9)) {
            const _live = true;
            args.live = _live;
        } else {
            args.live = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _date = reader.readInt();
        args.date = _date;
        const _expireDate = reader.readInt();
        args.expireDate = _expireDate;
        return new StoryItemSkipped(args);
    }
}