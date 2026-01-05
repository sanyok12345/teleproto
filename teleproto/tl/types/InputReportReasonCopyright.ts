import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonCopyright extends TLObject {
    static CONSTRUCTOR_ID = 2609510714;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonCopyright";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2609510714, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonCopyright {
        const args: any = {};
        return new InputReportReasonCopyright(args);
    }
}