import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputUserSelf extends TLObject {
    static CONSTRUCTOR_ID = 4156666175;
    static SUBCLASS_OF_ID = 3865689926;
    static className = "InputUserSelf";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4156666175, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputUserSelf {
        const args: any = {};
        return new InputUserSelf(args);
    }
}