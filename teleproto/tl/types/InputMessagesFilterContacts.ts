import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterContacts extends TLObject {
    static CONSTRUCTOR_ID = 3764575107;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterContacts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3764575107, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterContacts {
        const args: any = {};
        return new InputMessagesFilterContacts(args);
    }
}