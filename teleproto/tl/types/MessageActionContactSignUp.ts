import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionContactSignUp extends TLObject {
    static CONSTRUCTOR_ID = 4092747638;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionContactSignUp";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4092747638, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionContactSignUp {
        const args: any = {};
        return new MessageActionContactSignUp(args);
    }
}