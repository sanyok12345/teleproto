import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterMyMentions extends TLObject {
    static CONSTRUCTOR_ID = 3254314650;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterMyMentions";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3254314650, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterMyMentions {
        const args: any = {};
        return new InputMessagesFilterMyMentions(args);
    }
}