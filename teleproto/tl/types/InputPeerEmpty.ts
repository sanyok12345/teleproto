import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPeerEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2134579434;
    static SUBCLASS_OF_ID = 3374092470;
    static className = "InputPeerEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2134579434, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerEmpty {
        const args: any = {};
        return new InputPeerEmpty(args);
    }
}