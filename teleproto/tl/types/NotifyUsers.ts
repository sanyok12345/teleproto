import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotifyUsers extends TLObject {
    static CONSTRUCTOR_ID = 3033021260;
    static SUBCLASS_OF_ID = 3756548142;
    static className = "NotifyUsers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3033021260, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotifyUsers {
        const args: any = {};
        return new NotifyUsers(args);
    }
}