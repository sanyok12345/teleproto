import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyPhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 4206550111;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyPhoneCall";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4206550111, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyPhoneCall {
        const args: any = {};
        return new InputPrivacyKeyPhoneCall(args);
    }
}