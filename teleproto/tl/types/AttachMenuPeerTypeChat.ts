import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuPeerTypeChat extends TLObject {
    static CONSTRUCTOR_ID = 84480319;
    static SUBCLASS_OF_ID = 3520628432;
    static className = "AttachMenuPeerTypeChat";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(84480319, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuPeerTypeChat {
        const args: any = {};
        return new AttachMenuPeerTypeChat(args);
    }
}