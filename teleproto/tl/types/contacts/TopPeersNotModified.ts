import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class TopPeersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3727060725;
    static SUBCLASS_OF_ID = 2666052488;
    static className = "contacts.TopPeersNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3727060725, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeersNotModified {
        const args: any = {};
        return new TopPeersNotModified(args);
    }
}