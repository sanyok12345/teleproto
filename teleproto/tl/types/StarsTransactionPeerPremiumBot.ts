import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTransactionPeerPremiumBot extends TLObject {
    static CONSTRUCTOR_ID = 621656824;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeerPremiumBot";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(621656824, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeerPremiumBot {
        const args: any = {};
        return new StarsTransactionPeerPremiumBot(args);
    }
}