import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReadParticipantDate extends TLObject {
    static CONSTRUCTOR_ID = 1246753138;
    static SUBCLASS_OF_ID = 4245130466;
    static className = "ReadParticipantDate";
    static classType = "constructor";

    userId!: bigint;
    date!: number;

    constructor(args: { userId?: bigint, date?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1246753138, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReadParticipantDate {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _date = reader.readInt();
        args.date = _date;
        return new ReadParticipantDate(args);
    }
}