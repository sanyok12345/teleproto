import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FilePdf extends TLObject {
    static CONSTRUCTOR_ID = 2921222285;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FilePdf";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2921222285, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FilePdf {
        const args: any = {};
        return new FilePdf(args);
    }
}