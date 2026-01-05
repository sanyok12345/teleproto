import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FavedStickersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2660214483;
    static SUBCLASS_OF_ID = 2389929913;
    static className = "messages.FavedStickersNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2660214483, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FavedStickersNotModified {
        const args: any = {};
        return new FavedStickersNotModified(args);
    }
}