import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallDiscardReasonBusy extends TLObject {
    static CONSTRUCTOR_ID = 4210550985;
    static SUBCLASS_OF_ID = 3634081085;
    static className = "PhoneCallDiscardReasonBusy";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4210550985, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallDiscardReasonBusy {
        const args: any = {};
        return new PhoneCallDiscardReasonBusy(args);
    }
}