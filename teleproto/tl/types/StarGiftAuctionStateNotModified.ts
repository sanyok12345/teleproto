import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAuctionStateNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4264769874;
    static SUBCLASS_OF_ID = 580130043;
    static className = "StarGiftAuctionStateNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4264769874, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionStateNotModified {
        const args: any = {};
        return new StarGiftAuctionStateNotModified(args);
    }
}