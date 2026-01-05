import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateSavedReactionTags extends TLObject {
    static CONSTRUCTOR_ID = 969307186;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSavedReactionTags";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(969307186, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSavedReactionTags {
        const args: any = {};
        return new UpdateSavedReactionTags(args);
    }
}