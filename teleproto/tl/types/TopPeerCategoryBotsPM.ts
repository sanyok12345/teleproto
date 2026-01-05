import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryBotsPM extends TLObject {
    static CONSTRUCTOR_ID = 2875595611;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryBotsPM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2875595611, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryBotsPM {
        const args: any = {};
        return new TopPeerCategoryBotsPM(args);
    }
}