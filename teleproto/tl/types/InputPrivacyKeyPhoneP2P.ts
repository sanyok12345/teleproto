import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyPhoneP2P extends TLObject {
    static CONSTRUCTOR_ID = 3684593874;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyPhoneP2P";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3684593874, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyPhoneP2P {
        const args: any = {};
        return new InputPrivacyKeyPhoneP2P(args);
    }
}