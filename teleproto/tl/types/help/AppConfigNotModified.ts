import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AppConfigNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2094949405;
    static SUBCLASS_OF_ID = 339221658;
    static className = "help.AppConfigNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2094949405, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AppConfigNotModified {
        const args: any = {};
        return new AppConfigNotModified(args);
    }
}