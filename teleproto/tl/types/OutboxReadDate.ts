import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class OutboxReadDate extends TLObject {
    static CONSTRUCTOR_ID = 1001931436;
    static SUBCLASS_OF_ID = 1867613126;
    static className = "OutboxReadDate";
    static classType = "constructor";

    date!: number;

    constructor(args: { date?: number } = {}) {
        super();
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1001931436, false);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): OutboxReadDate {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        return new OutboxReadDate(args);
    }
}