import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BaseThemeTinted extends TLObject {
    static CONSTRUCTOR_ID = 1834973166;
    static SUBCLASS_OF_ID = 520352836;
    static className = "BaseThemeTinted";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1834973166, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BaseThemeTinted {
        const args: any = {};
        return new BaseThemeTinted(args);
    }
}