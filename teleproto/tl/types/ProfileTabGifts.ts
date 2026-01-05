import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabGifts extends TLObject {
    static CONSTRUCTOR_ID = 1296815210;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabGifts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1296815210, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabGifts {
        const args: any = {};
        return new ProfileTabGifts(args);
    }
}