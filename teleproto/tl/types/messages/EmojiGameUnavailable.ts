import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EmojiGameUnavailable extends TLObject {
    static CONSTRUCTOR_ID = 1508266805;
    static SUBCLASS_OF_ID = 105590818;
    static className = "messages.EmojiGameUnavailable";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1508266805, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGameUnavailable {
        const args: any = {};
        return new EmojiGameUnavailable(args);
    }
}