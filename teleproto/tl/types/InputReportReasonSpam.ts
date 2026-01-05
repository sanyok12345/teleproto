import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonSpam extends TLObject {
    static CONSTRUCTOR_ID = 1490799288;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonSpam";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1490799288, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonSpam {
        const args: any = {};
        return new InputReportReasonSpam(args);
    }
}