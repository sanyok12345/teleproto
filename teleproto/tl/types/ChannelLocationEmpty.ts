import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelLocationEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3216354699;
    static SUBCLASS_OF_ID = 3961916287;
    static className = "ChannelLocationEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3216354699, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelLocationEmpty {
        const args: any = {};
        return new ChannelLocationEmpty(args);
    }
}