import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecurePasswordKdfAlgoUnknown extends TLObject {
    static CONSTRUCTOR_ID = 4883767;
    static SUBCLASS_OF_ID = 1998989635;
    static className = "SecurePasswordKdfAlgoUnknown";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4883767, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecurePasswordKdfAlgoUnknown {
        const args: any = {};
        return new SecurePasswordKdfAlgoUnknown(args);
    }
}