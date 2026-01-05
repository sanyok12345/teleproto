import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FilePartial extends TLObject {
    static CONSTRUCTOR_ID = 1086091090;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FilePartial";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1086091090, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FilePartial {
        const args: any = {};
        return new FilePartial(args);
    }
}