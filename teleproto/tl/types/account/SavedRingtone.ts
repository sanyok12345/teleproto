import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedRingtone extends TLObject {
    static CONSTRUCTOR_ID = 3072737133;
    static SUBCLASS_OF_ID = 2984412196;
    static className = "account.SavedRingtone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3072737133, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedRingtone {
        const args: any = {};
        return new SavedRingtone(args);
    }
}