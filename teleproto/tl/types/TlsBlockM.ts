import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockM extends TLObject {
    static CONSTRUCTOR_ID = 2648724363;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockM";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2648724363, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockM {
        const args: any = {};
        return new TlsBlockM(args);
    }
}