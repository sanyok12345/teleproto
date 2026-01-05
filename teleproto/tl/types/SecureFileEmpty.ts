import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureFileEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1679398724;
    static SUBCLASS_OF_ID = 1572395975;
    static className = "SecureFileEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1679398724, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureFileEmpty {
        const args: any = {};
        return new SecureFileEmpty(args);
    }
}