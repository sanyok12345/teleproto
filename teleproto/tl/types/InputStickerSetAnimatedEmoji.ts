import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetAnimatedEmoji extends TLObject {
    static CONSTRUCTOR_ID = 42402760;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetAnimatedEmoji";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(42402760, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetAnimatedEmoji {
        const args: any = {};
        return new InputStickerSetAnimatedEmoji(args);
    }
}