import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueDisallowBots extends TLObject {
    static CONSTRUCTOR_ID = 4138072111;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueDisallowBots";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4138072111, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueDisallowBots {
        const args: any = {};
        return new PrivacyValueDisallowBots(args);
    }
}