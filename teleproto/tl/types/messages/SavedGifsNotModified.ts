import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedGifsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3892468898;
    static SUBCLASS_OF_ID = 2794152437;
    static className = "messages.SavedGifsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3892468898, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedGifsNotModified {
        const args: any = {};
        return new SavedGifsNotModified(args);
    }
}