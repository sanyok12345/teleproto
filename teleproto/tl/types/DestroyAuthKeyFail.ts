import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DestroyAuthKeyFail extends TLObject {
    static CONSTRUCTOR_ID = 3926956819;
    static SUBCLASS_OF_ID = 2190599822;
    static className = "DestroyAuthKeyFail";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3926956819, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DestroyAuthKeyFail {
        const args: any = {};
        return new DestroyAuthKeyFail(args);
    }
}