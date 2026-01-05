import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ResetPasswordOk extends TLObject {
    static CONSTRUCTOR_ID = 3911636542;
    static SUBCLASS_OF_ID = 1230009366;
    static className = "account.ResetPasswordOk";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3911636542, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResetPasswordOk {
        const args: any = {};
        return new ResetPasswordOk(args);
    }
}