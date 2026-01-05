import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BusinessAwayMessageScheduleAlways extends TLObject {
    static CONSTRUCTOR_ID = 3384402617;
    static SUBCLASS_OF_ID = 672702558;
    static className = "BusinessAwayMessageScheduleAlways";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3384402617, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessAwayMessageScheduleAlways {
        const args: any = {};
        return new BusinessAwayMessageScheduleAlways(args);
    }
}