import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputReportReasonGeoIrrelevant extends TLObject {
    static CONSTRUCTOR_ID = 3688169197;
    static SUBCLASS_OF_ID = 2214706471;
    static className = "InputReportReasonGeoIrrelevant";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3688169197, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReportReasonGeoIrrelevant {
        const args: any = {};
        return new InputReportReasonGeoIrrelevant(args);
    }
}