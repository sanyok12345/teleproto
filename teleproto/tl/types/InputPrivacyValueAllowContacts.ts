import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueAllowContacts extends TLObject {
    static CONSTRUCTOR_ID = 218751099;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueAllowContacts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(218751099, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueAllowContacts {
        const args: any = {};
        return new InputPrivacyValueAllowContacts(args);
    }
}