import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyPhoneNumber extends TLObject {
    static CONSTRUCTOR_ID = 3516589165;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyPhoneNumber";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3516589165, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyPhoneNumber {
        const args: any = {};
        return new PrivacyKeyPhoneNumber(args);
    }
}