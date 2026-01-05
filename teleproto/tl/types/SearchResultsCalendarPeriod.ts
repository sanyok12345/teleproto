import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SearchResultsCalendarPeriod extends TLObject {
    static CONSTRUCTOR_ID = 3383776159;
    static SUBCLASS_OF_ID = 3797743871;
    static className = "SearchResultsCalendarPeriod";
    static classType = "constructor";

    date!: number;
    minMsgId!: number;
    maxMsgId!: number;
    count!: number;

    constructor(args: { date?: number, minMsgId?: number, maxMsgId?: number, count?: number } = {}) {
        super();
        this.date = args.date!;
        this.minMsgId = args.minMsgId!;
        this.maxMsgId = args.maxMsgId!;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3383776159, false);
        writer.writeInt(this.date);
        writer.writeInt(this.minMsgId);
        writer.writeInt(this.maxMsgId);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SearchResultsCalendarPeriod {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        const _minMsgId = reader.readInt();
        args.minMsgId = _minMsgId;
        const _maxMsgId = reader.readInt();
        args.maxMsgId = _maxMsgId;
        const _count = reader.readInt();
        args.count = _count;
        return new SearchResultsCalendarPeriod(args);
    }
}