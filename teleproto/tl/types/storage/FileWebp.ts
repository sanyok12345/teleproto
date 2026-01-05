import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileWebp extends TLObject {
    static CONSTRUCTOR_ID = 276907596;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileWebp";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(276907596, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileWebp {
        const args: any = {};
        return new FileWebp(args);
    }
}