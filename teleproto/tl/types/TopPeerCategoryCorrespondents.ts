import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryCorrespondents extends TLObject {
    static CONSTRUCTOR_ID = 104314861;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryCorrespondents";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(104314861, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryCorrespondents {
        const args: any = {};
        return new TopPeerCategoryCorrespondents(args);
    }
}