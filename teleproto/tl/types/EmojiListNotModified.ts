import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiListNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1209970170;
    static SUBCLASS_OF_ID = 3169807034;
    static className = "EmojiListNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1209970170, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiListNotModified {
        const args: any = {};
        return new EmojiListNotModified(args);
    }
}