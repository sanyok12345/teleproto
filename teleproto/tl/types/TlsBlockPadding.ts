import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockPadding extends TLObject {
    static CONSTRUCTOR_ID = 2754966040;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockPadding";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2754966040, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockPadding {
        const args: any = {};
        return new TlsBlockPadding(args);
    }
}