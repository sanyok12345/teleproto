import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyPhoneNumber extends TLObject {
    static CONSTRUCTOR_ID = 55761658;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyPhoneNumber";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(55761658, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyPhoneNumber {
        const args: any = {};
        return new InputPrivacyKeyPhoneNumber(args);
    }
}