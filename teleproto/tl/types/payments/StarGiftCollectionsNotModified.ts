import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StarGiftCollectionsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2696564503;
    static SUBCLASS_OF_ID = 4028047852;
    static className = "payments.StarGiftCollectionsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2696564503, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftCollectionsNotModified {
        const args: any = {};
        return new StarGiftCollectionsNotModified(args);
    }
}