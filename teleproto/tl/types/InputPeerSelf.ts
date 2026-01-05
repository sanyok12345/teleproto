import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPeerSelf extends TLObject {
    static CONSTRUCTOR_ID = 2107670217;
    static SUBCLASS_OF_ID = 3374092470;
    static className = "InputPeerSelf";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2107670217, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerSelf {
        const args: any = {};
        return new InputPeerSelf(args);
    }
}