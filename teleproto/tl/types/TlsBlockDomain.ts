import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockDomain extends TLObject {
    static CONSTRUCTOR_ID = 283665263;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockDomain";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(283665263, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockDomain {
        const args: any = {};
        return new TlsBlockDomain(args);
    }
}