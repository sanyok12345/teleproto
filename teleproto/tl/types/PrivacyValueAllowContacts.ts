import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueAllowContacts extends TLObject {
    static CONSTRUCTOR_ID = 4294843308;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueAllowContacts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4294843308, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueAllowContacts {
        const args: any = {};
        return new PrivacyValueAllowContacts(args);
    }
}