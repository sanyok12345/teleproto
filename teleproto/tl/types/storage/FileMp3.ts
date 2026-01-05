import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileMp3 extends TLObject {
    static CONSTRUCTOR_ID = 1384777335;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileMp3";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1384777335, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileMp3 {
        const args: any = {};
        return new FileMp3(args);
    }
}