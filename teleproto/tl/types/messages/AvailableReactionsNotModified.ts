import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AvailableReactionsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2668042583;
    static SUBCLASS_OF_ID = 3827740034;
    static className = "messages.AvailableReactionsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2668042583, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AvailableReactionsNotModified {
        const args: any = {};
        return new AvailableReactionsNotModified(args);
    }
}