import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PasswordKdfAlgoUnknown extends TLObject {
    static CONSTRUCTOR_ID = 3562713238;
    static SUBCLASS_OF_ID = 935130572;
    static className = "PasswordKdfAlgoUnknown";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3562713238, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasswordKdfAlgoUnknown {
        const args: any = {};
        return new PasswordKdfAlgoUnknown(args);
    }
}