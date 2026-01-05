import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentAttributeHasStickers extends TLObject {
    static CONSTRUCTOR_ID = 2550256375;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeHasStickers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2550256375, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeHasStickers {
        const args: any = {};
        return new DocumentAttributeHasStickers(args);
    }
}