import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetEmpty extends TLObject {
    static CONSTRUCTOR_ID = 4290128789;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4290128789, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetEmpty {
        const args: any = {};
        return new InputStickerSetEmpty(args);
    }
}