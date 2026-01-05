import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StickersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4050950690;
    static SUBCLASS_OF_ID = 3611015646;
    static className = "messages.StickersNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4050950690, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickersNotModified {
        const args: any = {};
        return new StickersNotModified(args);
    }
}