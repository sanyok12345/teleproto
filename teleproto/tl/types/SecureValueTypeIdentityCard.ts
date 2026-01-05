import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeIdentityCard extends TLObject {
    static CONSTRUCTOR_ID = 2698015819;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeIdentityCard";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2698015819, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeIdentityCard {
        const args: any = {};
        return new SecureValueTypeIdentityCard(args);
    }
}