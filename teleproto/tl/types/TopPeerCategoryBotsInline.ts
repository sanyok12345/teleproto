import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryBotsInline extends TLObject {
    static CONSTRUCTOR_ID = 344356834;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryBotsInline";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(344356834, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryBotsInline {
        const args: any = {};
        return new TopPeerCategoryBotsInline(args);
    }
}