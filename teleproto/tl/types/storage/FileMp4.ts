import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileMp4 extends TLObject {
    static CONSTRUCTOR_ID = 3016663268;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileMp4";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3016663268, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileMp4 {
        const args: any = {};
        return new FileMp4(args);
    }
}