import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeTemporaryRegistration extends TLObject {
    static CONSTRUCTOR_ID = 3926060083;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeTemporaryRegistration";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3926060083, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeTemporaryRegistration {
        const args: any = {};
        return new SecureValueTypeTemporaryRegistration(args);
    }
}