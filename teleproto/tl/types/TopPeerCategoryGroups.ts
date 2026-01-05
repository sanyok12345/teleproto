import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryGroups extends TLObject {
    static CONSTRUCTOR_ID = 3172442442;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryGroups";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3172442442, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryGroups {
        const args: any = {};
        return new TopPeerCategoryGroups(args);
    }
}