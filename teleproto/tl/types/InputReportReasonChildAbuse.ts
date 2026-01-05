import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonChildAbuse extends TLObject {
    static CONSTRUCTOR_ID = 2918469347;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonChildAbuse";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2918469347, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonChildAbuse {
        const args: any = {};
        return new InputReportReasonChildAbuse(args);
    }
}