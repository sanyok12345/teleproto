import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ReactionsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2960120799;
    static SUBCLASS_OF_ID = 2915271460;
    static className = "messages.ReactionsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2960120799, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionsNotModified {
        const args: any = {};
        return new ReactionsNotModified(args);
    }
}