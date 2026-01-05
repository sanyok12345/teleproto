import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmailVerifyPurposeLoginChange extends TLObject {
    static CONSTRUCTOR_ID = 1383932651;
    static SUBCLASS_OF_ID = 3110628072;
    static className = "EmailVerifyPurposeLoginChange";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1383932651, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerifyPurposeLoginChange {
        const args: any = {};
        return new EmailVerifyPurposeLoginChange(args);
    }
}