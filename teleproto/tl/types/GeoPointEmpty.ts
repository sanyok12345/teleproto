import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class GeoPointEmpty extends TLObject {
    static CONSTRUCTOR_ID = 286776671;
    static SUBCLASS_OF_ID = 3591430509;
    static className = "GeoPointEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(286776671, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GeoPointEmpty {
        const args: any = {};
        return new GeoPointEmpty(args);
    }
}