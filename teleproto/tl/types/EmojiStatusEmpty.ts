import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiStatusEmpty extends TLObject {
    static CONSTRUCTOR_ID = 769727150;
    static SUBCLASS_OF_ID = 4180717880;
    static className = "EmojiStatusEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(769727150, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiStatusEmpty {
        const args: any = {};
        return new EmojiStatusEmpty(args);
    }
}