import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryPhoneCalls extends TLObject {
    static CONSTRUCTOR_ID = 511092620;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryPhoneCalls";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(511092620, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryPhoneCalls {
        const args: any = {};
        return new TopPeerCategoryPhoneCalls(args);
    }
}