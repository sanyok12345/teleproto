import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DestroyAuthKeyOk extends TLObject {
    static CONSTRUCTOR_ID = 4133544404;
    static SUBCLASS_OF_ID = 2190599822;
    static className = "DestroyAuthKeyOk";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4133544404, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DestroyAuthKeyOk {
        const args: any = {};
        return new DestroyAuthKeyOk(args);
    }
}