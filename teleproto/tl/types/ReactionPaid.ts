import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReactionPaid extends TLObject {
    static CONSTRUCTOR_ID = 1379771627;
    static SUBCLASS_OF_ID = 1570858401;
    static className = "ReactionPaid";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1379771627, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionPaid {
        const args: any = {};
        return new ReactionPaid(args);
    }
}