import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypePassportRegistration extends TLObject {
    static CONSTRUCTOR_ID = 2581823594;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypePassportRegistration";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2581823594, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypePassportRegistration {
        const args: any = {};
        return new SecureValueTypePassportRegistration(args);
    }
}