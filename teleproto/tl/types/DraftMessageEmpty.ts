import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DraftMessageEmpty extends TLObject {
    static CONSTRUCTOR_ID = 453805082;
    static SUBCLASS_OF_ID = 869564229;
    static className = "DraftMessageEmpty";
    static classType = "constructor";

    flags!: number;
    date?: number;

    constructor(args: { flags?: number, date?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.date = args.date;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(453805082, false);
        let flags = 0;
        if (this.date !== undefined && this.date !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.date !== undefined && this.date !== null) {
            writer.writeInt(this.date);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DraftMessageEmpty {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _date = reader.readInt();
            args.date = _date;
        } else {
            args.date = undefined;
        }
        return new DraftMessageEmpty(args);
    }
}