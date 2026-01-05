import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedReactionTagsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2291882479;
    static SUBCLASS_OF_ID = 2744867811;
    static className = "messages.SavedReactionTagsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2291882479, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedReactionTagsNotModified {
        const args: any = {};
        return new SavedReactionTagsNotModified(args);
    }
}