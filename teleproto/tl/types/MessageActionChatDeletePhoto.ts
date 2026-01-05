import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatDeletePhoto extends TLObject {
    static CONSTRUCTOR_ID = 2514746351;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatDeletePhoto";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2514746351, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatDeletePhoto {
        const args: any = {};
        return new MessageActionChatDeletePhoto(args);
    }
}