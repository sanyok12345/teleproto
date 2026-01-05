import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyPhoneP2P extends TLObject {
    static CONSTRUCTOR_ID = 961092808;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyPhoneP2P";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(961092808, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyPhoneP2P {
        const args: any = {};
        return new PrivacyKeyPhoneP2P(args);
    }
}