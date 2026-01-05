import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ContactsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3075189202;
    static SUBCLASS_OF_ID = 951985654;
    static className = "contacts.ContactsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3075189202, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ContactsNotModified {
        const args: any = {};
        return new ContactsNotModified(args);
    }
}