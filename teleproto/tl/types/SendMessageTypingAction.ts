import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageTypingAction extends TLObject {
    static CONSTRUCTOR_ID = 381645902;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageTypingAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(381645902, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageTypingAction {
        const args: any = {};
        return new SendMessageTypingAction(args);
    }
}