import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class DifferenceEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1567990072;
    static SUBCLASS_OF_ID = 541599860;
    static className = "updates.DifferenceEmpty";
    static classType = "constructor";

    date!: number;
    seq!: number;

    constructor(args: { date?: number, seq?: number } = {}) {
        super();
        this.date = args.date!;
        this.seq = args.seq!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1567990072, false);
        writer.writeInt(this.date);
        writer.writeInt(this.seq);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DifferenceEmpty {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        const _seq = reader.readInt();
        args.seq = _seq;
        return new DifferenceEmpty(args);
    }
}