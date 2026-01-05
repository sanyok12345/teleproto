import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedFileEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3256830334;
    static SUBCLASS_OF_ID = 2217371584;
    static className = "EncryptedFileEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3256830334, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedFileEmpty {
        const args: any = {};
        return new EncryptedFileEmpty(args);
    }
}