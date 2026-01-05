import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BaseThemeClassic extends TLObject {
    static CONSTRUCTOR_ID = 3282117730;
    static SUBCLASS_OF_ID = 520352836;
    static className = "BaseThemeClassic";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3282117730, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BaseThemeClassic {
        const args: any = {};
        return new BaseThemeClassic(args);
    }
}