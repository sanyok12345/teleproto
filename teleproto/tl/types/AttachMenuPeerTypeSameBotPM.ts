import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuPeerTypeSameBotPM extends TLObject {
    static CONSTRUCTOR_ID = 2104224014;
    static SUBCLASS_OF_ID = 3520628432;
    static className = "AttachMenuPeerTypeSameBotPM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2104224014, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuPeerTypeSameBotPM {
        const args: any = {};
        return new AttachMenuPeerTypeSameBotPM(args);
    }
}