import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryForwardUsers extends TLObject {
    static CONSTRUCTOR_ID = 2822794409;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryForwardUsers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2822794409, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryForwardUsers {
        const args: any = {};
        return new TopPeerCategoryForwardUsers(args);
    }
}