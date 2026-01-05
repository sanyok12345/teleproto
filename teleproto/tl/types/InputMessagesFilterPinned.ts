import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterPinned extends TLObject {
    static CONSTRUCTOR_ID = 464520273;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterPinned";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(464520273, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterPinned {
        const args: any = {};
        return new InputMessagesFilterPinned(args);
    }
}