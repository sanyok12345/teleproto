import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTransactionPeerAPI extends TLObject {
    static CONSTRUCTOR_ID = 4184308397;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeerAPI";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4184308397, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeerAPI {
        const args: any = {};
        return new StarsTransactionPeerAPI(args);
    }
}