import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TopPeerCategoryChannels extends TLObject {
    static CONSTRUCTOR_ID = 371037736;
    static SUBCLASS_OF_ID = 3723502850;
    static className = "TopPeerCategoryChannels";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(371037736, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryChannels {
        const args: any = {};
        return new TopPeerCategoryChannels(args);
    }
}