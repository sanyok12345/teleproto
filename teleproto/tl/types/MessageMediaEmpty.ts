import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageMediaEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1038967584;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1038967584, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaEmpty {
        const args: any = {};
        return new MessageMediaEmpty(args);
    }
}