import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateFavedStickers extends TLObject {
    static CONSTRUCTOR_ID = 3843135853;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateFavedStickers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3843135853, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateFavedStickers {
        const args: any = {};
        return new UpdateFavedStickers(args);
    }
}