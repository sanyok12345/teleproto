import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionHistoryClear extends TLObject {
    static CONSTRUCTOR_ID = 2679813636;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionHistoryClear";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2679813636, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionHistoryClear {
        const args: any = {};
        return new MessageActionHistoryClear(args);
    }
}