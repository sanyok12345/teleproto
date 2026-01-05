import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueAllowPremium extends TLObject {
    static CONSTRUCTOR_ID = 2009975281;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueAllowPremium";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2009975281, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueAllowPremium {
        const args: any = {};
        return new InputPrivacyValueAllowPremium(args);
    }
}