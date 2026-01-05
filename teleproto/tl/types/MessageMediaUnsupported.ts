import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageMediaUnsupported extends TLObject {
    static CONSTRUCTOR_ID = 2676290718;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaUnsupported";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2676290718, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaUnsupported {
        const args: any = {};
        return new MessageMediaUnsupported(args);
    }
}