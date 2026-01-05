import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTransactionPeerPlayMarket extends TLObject {
    static CONSTRUCTOR_ID = 2069236235;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeerPlayMarket";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2069236235, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeerPlayMarket {
        const args: any = {};
        return new StarsTransactionPeerPlayMarket(args);
    }
}