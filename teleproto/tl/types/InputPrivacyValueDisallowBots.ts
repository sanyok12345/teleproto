import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueDisallowBots extends TLObject {
    static CONSTRUCTOR_ID = 3303373077;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueDisallowBots";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3303373077, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueDisallowBots {
        const args: any = {};
        return new InputPrivacyValueDisallowBots(args);
    }
}