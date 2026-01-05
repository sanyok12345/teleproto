import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonViolence extends TLObject {
    static CONSTRUCTOR_ID = 505595789;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonViolence";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(505595789, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonViolence {
        const args: any = {};
        return new InputReportReasonViolence(args);
    }
}