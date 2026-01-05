import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuPeerTypePM extends TLObject {
    static CONSTRUCTOR_ID = 4047950623;
    static SUBCLASS_OF_ID = 3520628432;
    static className = "AttachMenuPeerTypePM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4047950623, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuPeerTypePM {
        const args: any = {};
        return new AttachMenuPeerTypePM(args);
    }
}