import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmailVerifyPurposePassport extends TLObject {
    static CONSTRUCTOR_ID = 3153401477;
    static SUBCLASS_OF_ID = 3110628072;
    static className = "EmailVerifyPurposePassport";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3153401477, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerifyPurposePassport {
        const args: any = {};
        return new EmailVerifyPurposePassport(args);
    }
}