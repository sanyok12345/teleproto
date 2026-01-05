import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterMusic extends TLObject {
    static CONSTRUCTOR_ID = 928101534;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterMusic";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(928101534, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterMusic {
        const args: any = {};
        return new InputMessagesFilterMusic(args);
    }
}