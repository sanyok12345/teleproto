import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BusinessAwayMessageScheduleCustom extends TLObject {
    static CONSTRUCTOR_ID = 3427638988;
    static SUBCLASS_OF_ID = 672702558;
    static className = "BusinessAwayMessageScheduleCustom";
    static classType = "constructor";

    startDate!: number;
    endDate!: number;

    constructor(args: { startDate?: number, endDate?: number } = {}) {
        super();
        this.startDate = args.startDate!;
        this.endDate = args.endDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3427638988, false);
        writer.writeInt(this.startDate);
        writer.writeInt(this.endDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessAwayMessageScheduleCustom {
        const args: any = {};
        const _startDate = reader.readInt();
        args.startDate = _startDate;
        const _endDate = reader.readInt();
        args.endDate = _endDate;
        return new BusinessAwayMessageScheduleCustom(args);
    }
}