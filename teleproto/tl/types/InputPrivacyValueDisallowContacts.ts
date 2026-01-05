import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueDisallowContacts extends TLObject {
    static CONSTRUCTOR_ID = 195371015;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueDisallowContacts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(195371015, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueDisallowContacts {
        const args: any = {};
        return new InputPrivacyValueDisallowContacts(args);
    }
}