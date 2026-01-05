import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BaseThemeArctic extends TLObject {
    static CONSTRUCTOR_ID = 1527845466;
    static SUBCLASS_OF_ID = 520352836;
    static className = "BaseThemeArctic";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1527845466, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BaseThemeArctic {
        const args: any = {};
        return new BaseThemeArctic(args);
    }
}