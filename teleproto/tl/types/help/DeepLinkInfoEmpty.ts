import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class DeepLinkInfoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1722786150;
    static SUBCLASS_OF_ID = 2555030584;
    static className = "help.DeepLinkInfoEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1722786150, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DeepLinkInfoEmpty {
        const args: any = {};
        return new DeepLinkInfoEmpty(args);
    }
}