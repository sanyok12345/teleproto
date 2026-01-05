import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StickerSetNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3556320491;
    static SUBCLASS_OF_ID = 2607827546;
    static className = "messages.StickerSetNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3556320491, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetNotModified {
        const args: any = {};
        return new StickerSetNotModified(args);
    }
}