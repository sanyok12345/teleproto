import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeBankStatement extends TLObject {
    static CONSTRUCTOR_ID = 2299755533;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeBankStatement";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2299755533, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeBankStatement {
        const args: any = {};
        return new SecureValueTypeBankStatement(args);
    }
}