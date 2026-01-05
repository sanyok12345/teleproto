import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeInternalPassport extends TLObject {
    static CONSTRUCTOR_ID = 2577698595;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeInternalPassport";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2577698595, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeInternalPassport {
        const args: any = {};
        return new SecureValueTypeInternalPassport(args);
    }
}