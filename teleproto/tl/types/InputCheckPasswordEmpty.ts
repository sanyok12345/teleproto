import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputCheckPasswordEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2558588504;
    static SUBCLASS_OF_ID = 3558536544;
    static className = "InputCheckPasswordEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2558588504, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputCheckPasswordEmpty {
        const args: any = {};
        return new InputCheckPasswordEmpty(args);
    }
}