import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class TopPeersDisabled extends TLObject {
    static CONSTRUCTOR_ID = 3039597469;
    static SUBCLASS_OF_ID = 2666052488;
    static className = "contacts.TopPeersDisabled";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3039597469, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeersDisabled {
        const args: any = {};
        return new TopPeersDisabled(args);
    }
}