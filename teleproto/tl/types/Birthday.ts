import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Birthday extends TLObject {
    static CONSTRUCTOR_ID = 1821253126;
    static SUBCLASS_OF_ID = 3196048996;
    static className = "Birthday";
    static classType = "constructor";

    flags!: number;
    day!: number;
    month!: number;
    year?: number;

    constructor(args: { flags?: number, day?: number, month?: number, year?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.day = args.day!;
        this.month = args.month!;
        this.year = args.year;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1821253126, false);
        let flags = 0;
        if (this.year !== undefined && this.year !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.day);
        writer.writeInt(this.month);
        if (this.year !== undefined && this.year !== null) {
            writer.writeInt(this.year);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Birthday {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _day = reader.readInt();
        args.day = _day;
        const _month = reader.readInt();
        args.month = _month;
        if (args.flags & (1 << 0)) {
            const _year = reader.readInt();
            args.year = _year;
        } else {
            args.year = undefined;
        }
        return new Birthday(args);
    }
}