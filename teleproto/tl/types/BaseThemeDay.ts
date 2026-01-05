import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BaseThemeDay extends TLObject {
    static CONSTRUCTOR_ID = 4225242760;
    static SUBCLASS_OF_ID = 520352836;
    static className = "BaseThemeDay";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4225242760, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BaseThemeDay {
        const args: any = {};
        return new BaseThemeDay(args);
    }
}