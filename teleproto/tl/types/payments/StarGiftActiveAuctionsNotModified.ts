import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StarGiftActiveAuctionsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3677608656;
    static SUBCLASS_OF_ID = 2440941767;
    static className = "payments.StarGiftActiveAuctionsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3677608656, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftActiveAuctionsNotModified {
        const args: any = {};
        return new StarGiftActiveAuctionsNotModified(args);
    }
}