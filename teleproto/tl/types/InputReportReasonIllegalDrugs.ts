import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonIllegalDrugs extends TLObject {
    static CONSTRUCTOR_ID = 177124030;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonIllegalDrugs";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(177124030, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonIllegalDrugs {
        const args: any = {};
        return new InputReportReasonIllegalDrugs(args);
    }
}