import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1474492012;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1474492012, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterEmpty {
        const args: any = {};
        return new InputMessagesFilterEmpty(args);
    }
}