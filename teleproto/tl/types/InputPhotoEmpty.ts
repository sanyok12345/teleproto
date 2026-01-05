import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPhotoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 483901197;
    static SUBCLASS_OF_ID = 2221106144;
    static className = "InputPhotoEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(483901197, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPhotoEmpty {
        const args: any = {};
        return new InputPhotoEmpty(args);
    }
}