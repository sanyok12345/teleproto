import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineQueryPeerTypePM extends TLObject {
    static CONSTRUCTOR_ID = 2201751468;
    static SUBCLASS_OF_ID = 2947611167;
    static className = "InlineQueryPeerTypePM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2201751468, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineQueryPeerTypePM {
        const args: any = {};
        return new InlineQueryPeerTypePM(args);
    }
}