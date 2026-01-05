import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class RecentStickersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 186120336;
    static SUBCLASS_OF_ID = 4151281283;
    static className = "messages.RecentStickersNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(186120336, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentStickersNotModified {
        const args: any = {};
        return new RecentStickersNotModified(args);
    }
}