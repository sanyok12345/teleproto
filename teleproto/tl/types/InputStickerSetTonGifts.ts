import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetTonGifts extends TLObject {
    static CONSTRUCTOR_ID = 485912992;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetTonGifts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(485912992, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetTonGifts {
        const args: any = {};
        return new InputStickerSetTonGifts(args);
    }
}