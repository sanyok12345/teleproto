import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ThemesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4095653410;
    static SUBCLASS_OF_ID = 2143625732;
    static className = "account.ThemesNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4095653410, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ThemesNotModified {
        const args: any = {};
        return new ThemesNotModified(args);
    }
}