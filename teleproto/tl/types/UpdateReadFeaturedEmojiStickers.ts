import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadFeaturedEmojiStickers extends TLObject {
    static CONSTRUCTOR_ID = 4216080748;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadFeaturedEmojiStickers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4216080748, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadFeaturedEmojiStickers {
        const args: any = {};
        return new UpdateReadFeaturedEmojiStickers(args);
    }
}