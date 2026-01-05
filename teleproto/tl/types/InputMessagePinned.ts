import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagePinned extends TLObject {
    static CONSTRUCTOR_ID = 2257003832;
    static SUBCLASS_OF_ID = 1421262021;
    static className = "InputMessagePinned";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2257003832, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagePinned {
        const args: any = {};
        return new InputMessagePinned(args);
    }
}