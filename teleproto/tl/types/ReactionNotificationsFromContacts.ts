import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReactionNotificationsFromContacts extends TLObject {
    static CONSTRUCTOR_ID = 3133384218;
    static SUBCLASS_OF_ID = 878672192;
    static className = "ReactionNotificationsFromContacts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3133384218, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionNotificationsFromContacts {
        const args: any = {};
        return new ReactionNotificationsFromContacts(args);
    }
}