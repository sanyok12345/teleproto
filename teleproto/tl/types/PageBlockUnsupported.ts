import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PageBlockUnsupported extends TLObject {
    static CONSTRUCTOR_ID = 324435594;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockUnsupported";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(324435594, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockUnsupported {
        const args: any = {};
        return new PageBlockUnsupported(args);
    }
}