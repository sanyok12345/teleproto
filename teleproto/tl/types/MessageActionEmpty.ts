import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3064919984;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3064919984, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionEmpty {
        const args: any = {};
        return new MessageActionEmpty(args);
    }
}