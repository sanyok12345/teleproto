import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateSavedGifs extends TLObject {
    static CONSTRUCTOR_ID = 2473931806;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSavedGifs";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2473931806, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSavedGifs {
        const args: any = {};
        return new UpdateSavedGifs(args);
    }
}