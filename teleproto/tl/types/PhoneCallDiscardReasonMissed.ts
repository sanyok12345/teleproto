import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallDiscardReasonMissed extends TLObject {
    static CONSTRUCTOR_ID = 2246320897;
    static SUBCLASS_OF_ID = 3634081085;
    static className = "PhoneCallDiscardReasonMissed";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2246320897, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallDiscardReasonMissed {
        const args: any = {};
        return new PhoneCallDiscardReasonMissed(args);
    }
}