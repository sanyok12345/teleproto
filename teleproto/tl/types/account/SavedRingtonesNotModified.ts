import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedRingtonesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4227262641;
    static SUBCLASS_OF_ID = 666683742;
    static className = "account.SavedRingtonesNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4227262641, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedRingtonesNotModified {
        const args: any = {};
        return new SavedRingtonesNotModified(args);
    }
}