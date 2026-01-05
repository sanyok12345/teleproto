import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PaidReactionPrivacyDefault extends TLObject {
    static CONSTRUCTOR_ID = 543872158;
    static SUBCLASS_OF_ID = 1708619318;
    static className = "PaidReactionPrivacyDefault";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(543872158, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaidReactionPrivacyDefault {
        const args: any = {};
        return new PaidReactionPrivacyDefault(args);
    }
}