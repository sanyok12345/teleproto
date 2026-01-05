import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentAttributeAnimated extends TLObject {
    static CONSTRUCTOR_ID = 297109817;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeAnimated";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(297109817, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeAnimated {
        const args: any = {};
        return new DocumentAttributeAnimated(args);
    }
}