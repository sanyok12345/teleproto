import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputEncryptedFileEmpty extends TLObject {
    static CONSTRUCTOR_ID = 406307684;
    static SUBCLASS_OF_ID = 2239021690;
    static className = "InputEncryptedFileEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(406307684, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputEncryptedFileEmpty {
        const args: any = {};
        return new InputEncryptedFileEmpty(args);
    }
}