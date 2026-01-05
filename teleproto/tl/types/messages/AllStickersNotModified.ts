import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AllStickersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3898999491;
    static SUBCLASS_OF_ID = 1166231593;
    static className = "messages.AllStickersNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3898999491, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AllStickersNotModified {
        const args: any = {};
        return new AllStickersNotModified(args);
    }
}