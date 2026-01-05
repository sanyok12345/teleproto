import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuBotsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4057500252;
    static SUBCLASS_OF_ID = 2217616346;
    static className = "AttachMenuBotsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4057500252, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuBotsNotModified {
        const args: any = {};
        return new AttachMenuBotsNotModified(args);
    }
}