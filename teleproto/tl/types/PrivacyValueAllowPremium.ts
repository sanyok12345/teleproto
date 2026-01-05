import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueAllowPremium extends TLObject {
    static CONSTRUCTOR_ID = 3974725963;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueAllowPremium";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3974725963, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueAllowPremium {
        const args: any = {};
        return new PrivacyValueAllowPremium(args);
    }
}