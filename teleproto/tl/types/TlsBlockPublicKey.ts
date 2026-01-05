import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockPublicKey extends TLObject {
    static CONSTRUCTOR_ID = 2662947676;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockPublicKey";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2662947676, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockPublicKey {
        const args: any = {};
        return new TlsBlockPublicKey(args);
    }
}