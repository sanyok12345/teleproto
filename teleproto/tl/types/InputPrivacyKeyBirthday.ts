import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyBirthday extends TLObject {
    static CONSTRUCTOR_ID = 3596227020;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyBirthday";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3596227020, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyBirthday {
        const args: any = {};
        return new InputPrivacyKeyBirthday(args);
    }
}