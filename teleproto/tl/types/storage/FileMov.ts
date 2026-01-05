import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileMov extends TLObject {
    static CONSTRUCTOR_ID = 1258941372;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileMov";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1258941372, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileMov {
        const args: any = {};
        return new FileMov(args);
    }
}