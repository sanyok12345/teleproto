import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallDiscardReasonHangup extends TLObject {
    static CONSTRUCTOR_ID = 1471006352;
    static SUBCLASS_OF_ID = 3634081085;
    static className = "PhoneCallDiscardReasonHangup";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1471006352, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallDiscardReasonHangup {
        const args: any = {};
        return new PhoneCallDiscardReasonHangup(args);
    }
}