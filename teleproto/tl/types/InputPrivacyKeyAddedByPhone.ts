import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyAddedByPhone extends TLObject {
    static CONSTRUCTOR_ID = 3508640733;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyAddedByPhone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3508640733, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyAddedByPhone {
        const args: any = {};
        return new InputPrivacyKeyAddedByPhone(args);
    }
}