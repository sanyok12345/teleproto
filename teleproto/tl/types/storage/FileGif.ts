import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FileGif extends TLObject {
    static CONSTRUCTOR_ID = 3403786975;
    static SUBCLASS_OF_ID = 4087473907;
    static className = "storage.FileGif";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3403786975, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileGif {
        const args: any = {};
        return new FileGif(args);
    }
}