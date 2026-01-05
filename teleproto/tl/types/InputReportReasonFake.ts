import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonFake extends TLObject {
    static CONSTRUCTOR_ID = 4124956391;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonFake";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4124956391, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonFake {
        const args: any = {};
        return new InputReportReasonFake(args);
    }
}