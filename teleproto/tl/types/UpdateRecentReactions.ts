import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateRecentReactions extends TLObject {
    static CONSTRUCTOR_ID = 1870160884;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateRecentReactions";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1870160884, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateRecentReactions {
        const args: any = {};
        return new UpdateRecentReactions(args);
    }
}