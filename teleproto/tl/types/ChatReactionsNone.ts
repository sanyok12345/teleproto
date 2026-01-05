import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatReactionsNone extends TLObject {
    static CONSTRUCTOR_ID = 3942396604;
    static SUBCLASS_OF_ID = 320742581;
    static className = "ChatReactionsNone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3942396604, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatReactionsNone {
        const args: any = {};
        return new ChatReactionsNone(args);
    }
}