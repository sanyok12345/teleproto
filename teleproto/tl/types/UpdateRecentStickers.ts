import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateRecentStickers extends TLObject {
    static CONSTRUCTOR_ID = 2588027936;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateRecentStickers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2588027936, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateRecentStickers {
        const args: any = {};
        return new UpdateRecentStickers(args);
    }
}