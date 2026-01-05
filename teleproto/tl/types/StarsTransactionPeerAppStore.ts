import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTransactionPeerAppStore extends TLObject {
    static CONSTRUCTOR_ID = 3025646453;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeerAppStore";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3025646453, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeerAppStore {
        const args: any = {};
        return new StarsTransactionPeerAppStore(args);
    }
}