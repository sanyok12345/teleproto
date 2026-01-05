import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonOther extends TLObject {
    static CONSTRUCTOR_ID = 3252986545;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonOther";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3252986545, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonOther {
        const args: any = {};
        return new InputReportReasonOther(args);
    }
}