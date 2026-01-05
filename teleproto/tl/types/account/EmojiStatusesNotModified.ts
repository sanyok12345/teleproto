import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EmojiStatusesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3498894917;
    static SUBCLASS_OF_ID = 3554674122;
    static className = "account.EmojiStatusesNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3498894917, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiStatusesNotModified {
        const args: any = {};
        return new EmojiStatusesNotModified(args);
    }
}