import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetEmojiDefaultTopicIcons extends TLObject {
    static CONSTRUCTOR_ID = 1153562857;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetEmojiDefaultTopicIcons";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1153562857, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetEmojiDefaultTopicIcons {
        const args: any = {};
        return new InputStickerSetEmojiDefaultTopicIcons(args);
    }
}