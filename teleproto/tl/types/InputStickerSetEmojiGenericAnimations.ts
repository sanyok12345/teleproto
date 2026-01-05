import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetEmojiGenericAnimations extends TLObject {
    static CONSTRUCTOR_ID = 80008398;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetEmojiGenericAnimations";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(80008398, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetEmojiGenericAnimations {
        const args: any = {};
        return new InputStickerSetEmojiGenericAnimations(args);
    }
}