import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdatesTooLong extends TLObject {
    static CONSTRUCTOR_ID = 3809980286;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "UpdatesTooLong";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3809980286, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatesTooLong {
        const args: any = {};
        return new UpdatesTooLong(args);
    }
}