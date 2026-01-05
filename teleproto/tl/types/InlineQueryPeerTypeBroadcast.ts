import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineQueryPeerTypeBroadcast extends TLObject {
    static CONSTRUCTOR_ID = 1664413338;
    static SUBCLASS_OF_ID = 2947611167;
    static className = "InlineQueryPeerTypeBroadcast";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1664413338, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineQueryPeerTypeBroadcast {
        const args: any = {};
        return new InlineQueryPeerTypeBroadcast(args);
    }
}