import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReportResultReported extends TLObject {
    static CONSTRUCTOR_ID = 2377333835;
    static SUBCLASS_OF_ID = 2899571768;
    static className = "ReportResultReported";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2377333835, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReportResultReported {
        const args: any = {};
        return new ReportResultReported(args);
    }
}