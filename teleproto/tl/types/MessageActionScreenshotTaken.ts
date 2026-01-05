import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionScreenshotTaken extends TLObject {
    static CONSTRUCTOR_ID = 1200788123;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionScreenshotTaken";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1200788123, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionScreenshotTaken {
        const args: any = {};
        return new MessageActionScreenshotTaken(args);
    }
}