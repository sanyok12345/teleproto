import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetEmojiDefaultStatuses extends TLObject {
    static CONSTRUCTOR_ID = 701560302;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetEmojiDefaultStatuses";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(701560302, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetEmojiDefaultStatuses {
        const args: any = {};
        return new InputStickerSetEmojiDefaultStatuses(args);
    }
}