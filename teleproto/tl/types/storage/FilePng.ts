import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FilePng extends TLObject {
    static CONSTRUCTOR_ID = 172975040;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FilePng";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(172975040, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FilePng {
        const args: any = {};
        return new FilePng(args);
    }
}