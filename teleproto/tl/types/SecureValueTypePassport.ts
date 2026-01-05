import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypePassport extends TLObject {
    static CONSTRUCTOR_ID = 1034709504;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypePassport";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1034709504, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypePassport {
        const args: any = {};
        return new SecureValueTypePassport(args);
    }
}