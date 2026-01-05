import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonPornography extends TLObject {
    static CONSTRUCTOR_ID = 777640226;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonPornography";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(777640226, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonPornography {
        const args: any = {};
        return new InputReportReasonPornography(args);
    }
}