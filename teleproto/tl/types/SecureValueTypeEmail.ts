import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureValueTypeEmail extends TLObject {
    static CONSTRUCTOR_ID = 2386339822;
    static SUBCLASS_OF_ID = 2291398038;
    static className = "SecureValueTypeEmail";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2386339822, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueTypeEmail {
        const args: any = {};
        return new SecureValueTypeEmail(args);
    }
}