import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryBotsApp extends TLObject {
    static CONSTRUCTOR_ID = 4255022060;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryBotsApp";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4255022060, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryBotsApp {
        const args: any = {};
        return new TopPeerCategoryBotsApp(args);
    }
}