import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotAppNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1571189943;
    static SUBCLASS_OF_ID = 34550446;
    static className = "BotAppNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1571189943, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotAppNotModified {
        const args: any = {};
        return new BotAppNotModified(args);
    }
}