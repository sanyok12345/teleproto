import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallDiscardReasonDisconnect extends TLObject {
    static CONSTRUCTOR_ID = 3767910816;
    static SUBCLASS_OF_ID = 3634081085;
    static className = "PhoneCallDiscardReasonDisconnect";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3767910816, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallDiscardReasonDisconnect {
        const args: any = {};
        return new PhoneCallDiscardReasonDisconnect(args);
    }
}