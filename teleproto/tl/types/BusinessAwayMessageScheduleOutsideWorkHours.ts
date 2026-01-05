import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BusinessAwayMessageScheduleOutsideWorkHours extends TLObject {
    static CONSTRUCTOR_ID = 3287479553;
    static SUBCLASS_OF_ID = 672702558;
    static className = "BusinessAwayMessageScheduleOutsideWorkHours";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3287479553, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessAwayMessageScheduleOutsideWorkHours {
        const args: any = {};
        return new BusinessAwayMessageScheduleOutsideWorkHours(args);
    }
}