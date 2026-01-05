import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetPremiumGifts extends TLObject {
    static CONSTRUCTOR_ID = 3364567810;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetPremiumGifts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3364567810, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetPremiumGifts {
        const args: any = {};
        return new InputStickerSetPremiumGifts(args);
    }
}