import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class QuickRepliesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1603398491;
    static SUBCLASS_OF_ID = 4147636582;
    static className = "messages.QuickRepliesNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1603398491, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): QuickRepliesNotModified {
        const args: any = {};
        return new QuickRepliesNotModified(args);
    }
}