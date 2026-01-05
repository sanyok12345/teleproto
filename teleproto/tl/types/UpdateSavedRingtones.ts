import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateSavedRingtones extends TLObject {
    static CONSTRUCTOR_ID = 1960361625;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSavedRingtones";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1960361625, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSavedRingtones {
        const args: any = {};
        return new UpdateSavedRingtones(args);
    }
}