import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InlineQueryPeerTypeChat extends TLObject {
    static CONSTRUCTOR_ID = 3613836554;
    static SUBCLASS_OF_ID = 2947611167;
    static className = "InlineQueryPeerTypeChat";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3613836554, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InlineQueryPeerTypeChat {
        const args: any = {};
        return new InlineQueryPeerTypeChat(args);
    }
}