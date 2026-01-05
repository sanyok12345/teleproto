import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockE extends TLObject {
    static CONSTRUCTOR_ID = 2615944565;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockE";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2615944565, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockE {
        const args: any = {};
        return new TlsBlockE(args);
    }
}