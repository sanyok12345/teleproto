import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileUnknown extends TLObject {
    static CONSTRUCTOR_ID = 2861972229;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileUnknown";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2861972229, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileUnknown {
        const args: any = {};
        return new FileUnknown(args);
    }
}