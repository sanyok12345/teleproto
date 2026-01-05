import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueAllowBots extends TLObject {
    static CONSTRUCTOR_ID = 1515179237;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueAllowBots";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1515179237, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueAllowBots {
        const args: any = {};
        return new InputPrivacyValueAllowBots(args);
    }
}