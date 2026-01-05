import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonPersonalDetails extends TLObject {
    static CONSTRUCTOR_ID = 2663876157;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonPersonalDetails";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2663876157, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonPersonalDetails {
        const args: any = {};
        return new InputReportReasonPersonalDetails(args);
    }
}