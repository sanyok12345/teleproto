import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PassportConfigNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3216634967;
    static SUBCLASS_OF_ID = 3328622765;
    static className = "help.PassportConfigNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3216634967, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PassportConfigNotModified {
        const args: any = {};
        return new PassportConfigNotModified(args);
    }
}