import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryForwardChats extends TLObject {
    static CONSTRUCTOR_ID = 4226728176;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryForwardChats";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4226728176, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryForwardChats {
        const args: any = {};
        return new TopPeerCategoryForwardChats(args);
    }
}