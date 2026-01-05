import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyAddedByPhone extends TLObject {
    static CONSTRUCTOR_ID = 1124062251;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyAddedByPhone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1124062251, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyAddedByPhone {
        const args: any = {};
        return new PrivacyKeyAddedByPhone(args);
    }
}