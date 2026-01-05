import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterRoundVoice extends TLObject {
    static CONSTRUCTOR_ID = 2054952868;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterRoundVoice";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2054952868, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterRoundVoice {
        const args: any = {};
        return new InputMessagesFilterRoundVoice(args);
    }
}