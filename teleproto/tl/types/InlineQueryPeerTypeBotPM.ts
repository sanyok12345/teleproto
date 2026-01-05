import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineQueryPeerTypeBotPM extends TLObject {
    static CONSTRUCTOR_ID = 238759180;
    static SUBCLASS_OF_ID = 2947611167;
    static className = "InlineQueryPeerTypeBotPM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(238759180, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineQueryPeerTypeBotPM {
        const args: any = {};
        return new InlineQueryPeerTypeBotPM(args);
    }
}