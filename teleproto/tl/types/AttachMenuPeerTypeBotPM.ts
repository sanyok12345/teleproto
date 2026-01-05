import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuPeerTypeBotPM extends TLObject {
    static CONSTRUCTOR_ID = 3274439194;
    static SUBCLASS_OF_ID = 3520628432;
    static className = "AttachMenuPeerTypeBotPM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3274439194, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuPeerTypeBotPM {
        const args: any = {};
        return new AttachMenuPeerTypeBotPM(args);
    }
}