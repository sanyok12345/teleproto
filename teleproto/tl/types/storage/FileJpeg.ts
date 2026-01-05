import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileJpeg extends TLObject {
    static CONSTRUCTOR_ID = 8322574;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileJpeg";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(8322574, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileJpeg {
        const args: any = {};
        return new FileJpeg(args);
    }
}