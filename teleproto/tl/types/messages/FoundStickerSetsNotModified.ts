import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FoundStickerSetsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 223655517;
    static SUBCLASS_OF_ID = 68023137;
    static className = "messages.FoundStickerSetsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(223655517, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FoundStickerSetsNotModified {
        const args: any = {};
        return new FoundStickerSetsNotModified(args);
    }
}