import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StarGiftsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2743640936;
    static SUBCLASS_OF_ID = 1635309988;
    static className = "payments.StarGiftsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2743640936, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftsNotModified {
        const args: any = {};
        return new StarGiftsNotModified(args);
    }
}