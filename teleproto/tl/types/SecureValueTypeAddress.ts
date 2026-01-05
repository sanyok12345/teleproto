import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeAddress extends TLObject {
    static CONSTRUCTOR_ID = 3420659238;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeAddress";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3420659238, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeAddress {
        const args: any = {};
        return new SecureValueTypeAddress(args);
    }
}