import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypePersonalDetails extends TLObject {
    static CONSTRUCTOR_ID = 2636808675;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypePersonalDetails";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2636808675, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypePersonalDetails {
        const args: any = {};
        return new SecureValueTypePersonalDetails(args);
    }
}