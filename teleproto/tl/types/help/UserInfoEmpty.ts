import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class UserInfoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 4088278765;
    static SUBCLASS_OF_ID = 1548998616;
    static className = "help.UserInfoEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4088278765, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserInfoEmpty {
        const args: any = {};
        return new UserInfoEmpty(args);
    }
}