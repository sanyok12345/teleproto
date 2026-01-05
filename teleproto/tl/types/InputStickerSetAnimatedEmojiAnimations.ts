import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetAnimatedEmojiAnimations extends TLObject {
    static CONSTRUCTOR_ID = 215889721;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetAnimatedEmojiAnimations";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(215889721, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetAnimatedEmojiAnimations {
        const args: any = {};
        return new InputStickerSetAnimatedEmojiAnimations(args);
    }
}