import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadFeaturedStickers extends TLObject {
    static CONSTRUCTOR_ID = 1461528386;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadFeaturedStickers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1461528386, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadFeaturedStickers {
        const args: any = {};
        return new UpdateReadFeaturedStickers(args);
    }
}