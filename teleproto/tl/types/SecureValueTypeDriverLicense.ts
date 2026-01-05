import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeDriverLicense extends TLObject {
    static CONSTRUCTOR_ID = 115615172;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeDriverLicense";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(115615172, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeDriverLicense {
        const args: any = {};
        return new SecureValueTypeDriverLicense(args);
    }
}