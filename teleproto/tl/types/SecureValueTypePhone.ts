import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypePhone extends TLObject {
    static CONSTRUCTOR_ID = 3005262555;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypePhone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3005262555, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypePhone {
        const args: any = {};
        return new SecureValueTypePhone(args);
    }
}