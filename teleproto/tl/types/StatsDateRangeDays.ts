import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsDateRangeDays extends TLObject {
    static CONSTRUCTOR_ID = 3057118639;
    static SUBCLASS_OF_ID = 2166579781;
    static className = "StatsDateRangeDays";
    static classType = "constructor";

    minDate!: number;
    maxDate!: number;

    constructor(args: { minDate?: number, maxDate?: number } = {}) {
        super();
        this.minDate = args.minDate!;
        this.maxDate = args.maxDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3057118639, false);
        writer.writeInt(this.minDate);
        writer.writeInt(this.maxDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsDateRangeDays {
        const args: any = {};
        const _minDate = reader.readInt();
        args.minDate = _minDate;
        const _maxDate = reader.readInt();
        args.maxDate = _maxDate;
        return new StatsDateRangeDays(args);
    }
}