import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineQueryPeerTypeSameBotPM extends TLObject {
    static CONSTRUCTOR_ID = 813821341;
    static SUBCLASS_OF_ID = 2947611167;
    static className = "InlineQueryPeerTypeSameBotPM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(813821341, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineQueryPeerTypeSameBotPM {
        const args: any = {};
        return new InlineQueryPeerTypeSameBotPM(args);
    }
}