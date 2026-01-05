import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatJoinedByRequest extends TLObject {
    static CONSTRUCTOR_ID = 3955008459;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatJoinedByRequest";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3955008459, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatJoinedByRequest {
        const args: any = {};
        return new MessageActionChatJoinedByRequest(args);
    }
}