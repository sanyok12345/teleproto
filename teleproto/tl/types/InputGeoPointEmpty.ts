import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputGeoPointEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3837862870;
    static SUBCLASS_OF_ID = 70308389;
    static className = "InputGeoPointEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3837862870, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputGeoPointEmpty {
        const args: any = {};
        return new InputGeoPointEmpty(args);
    }
}