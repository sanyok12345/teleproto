import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTransactionPeerAds extends TLObject {
    static CONSTRUCTOR_ID = 1617438738;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeerAds";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1617438738, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeerAds {
        const args: any = {};
        return new StarsTransactionPeerAds(args);
    }
}