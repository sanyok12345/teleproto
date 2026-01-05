import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PageBlockDivider extends TLObject {
    static CONSTRUCTOR_ID = 3676352904;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockDivider";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3676352904, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockDivider {
        const args: any = {};
        return new PageBlockDivider(args);
    }
}