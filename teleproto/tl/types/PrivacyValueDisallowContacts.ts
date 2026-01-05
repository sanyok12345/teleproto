import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueDisallowContacts extends TLObject {
    static CONSTRUCTOR_ID = 4169726490;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueDisallowContacts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4169726490, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueDisallowContacts {
        const args: any = {};
        return new PrivacyValueDisallowContacts(args);
    }
}