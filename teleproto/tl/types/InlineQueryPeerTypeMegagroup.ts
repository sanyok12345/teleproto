import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineQueryPeerTypeMegagroup extends TLObject {
    static CONSTRUCTOR_ID = 1589952067;
    static SUBCLASS_OF_ID = 2947611167;
    static className = "InlineQueryPeerTypeMegagroup";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1589952067, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineQueryPeerTypeMegagroup {
        const args: any = {};
        return new InlineQueryPeerTypeMegagroup(args);
    }
}