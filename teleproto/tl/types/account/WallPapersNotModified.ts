import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class WallPapersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 471437699;
    static SUBCLASS_OF_ID = 2730838269;
    static className = "account.WallPapersNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(471437699, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WallPapersNotModified {
        const args: any = {};
        return new WallPapersNotModified(args);
    }
}