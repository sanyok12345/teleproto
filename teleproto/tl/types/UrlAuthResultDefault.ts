import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UrlAuthResultDefault extends TLObject {
    static CONSTRUCTOR_ID = 2849430303;
    static SUBCLASS_OF_ID = 2003159838;
    static className = "UrlAuthResultDefault";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2849430303, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UrlAuthResultDefault {
        const args: any = {};
        return new UrlAuthResultDefault(args);
    }
}