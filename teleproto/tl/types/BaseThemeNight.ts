import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BaseThemeNight extends TLObject {
    static CONSTRUCTOR_ID = 3081969320;
    static SUBCLASS_OF_ID = 520352836;
    static className = "BaseThemeNight";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3081969320, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BaseThemeNight {
        const args: any = {};
        return new BaseThemeNight(args);
    }
}