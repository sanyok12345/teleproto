import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionPinMessage extends TLObject {
    static CONSTRUCTOR_ID = 2495428845;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPinMessage";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2495428845, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPinMessage {
        const args: any = {};
        return new MessageActionPinMessage(args);
    }
}