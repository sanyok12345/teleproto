import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTransactionPeerUnsupported extends TLObject {
    static CONSTRUCTOR_ID = 2515714020;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeerUnsupported";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2515714020, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeerUnsupported {
        const args: any = {};
        return new StarsTransactionPeerUnsupported(args);
    }
}