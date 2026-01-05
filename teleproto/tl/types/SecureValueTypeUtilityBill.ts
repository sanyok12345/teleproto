import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeUtilityBill extends TLObject {
    static CONSTRUCTOR_ID = 4231435598;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeUtilityBill";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4231435598, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeUtilityBill {
        const args: any = {};
        return new SecureValueTypeUtilityBill(args);
    }
}