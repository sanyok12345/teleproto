import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PaidReactionPrivacyAnonymous extends TLObject {
    static CONSTRUCTOR_ID = 520887001;
    static SUBCLASS_OF_ID = 1708619318;
    static className = "PaidReactionPrivacyAnonymous";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(520887001, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaidReactionPrivacyAnonymous {
        const args: any = {};
        return new PaidReactionPrivacyAnonymous(args);
    }
}