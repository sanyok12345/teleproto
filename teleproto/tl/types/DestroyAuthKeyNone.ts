import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DestroyAuthKeyNone extends TLObject {
    static CONSTRUCTOR_ID = 178201177;
    static SUBCLASS_OF_ID = 2190599822;
    static className = "DestroyAuthKeyNone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(178201177, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DestroyAuthKeyNone {
        const args: any = {};
        return new DestroyAuthKeyNone(args);
    }
}