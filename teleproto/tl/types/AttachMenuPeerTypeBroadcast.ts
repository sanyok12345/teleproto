import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuPeerTypeBroadcast extends TLObject {
    static CONSTRUCTOR_ID = 2080104188;
    static SUBCLASS_OF_ID = 3520628432;
    static className = "AttachMenuPeerTypeBroadcast";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2080104188, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuPeerTypeBroadcast {
        const args: any = {};
        return new AttachMenuPeerTypeBroadcast(args);
    }
}