import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UserStatusEmpty extends TLObject {
    static CONSTRUCTOR_ID = 164646985;
    static SUBCLASS_OF_ID = 1527477310;
    static className = "UserStatusEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(164646985, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserStatusEmpty {
        const args: any = {};
        return new UserStatusEmpty(args);
    }
}