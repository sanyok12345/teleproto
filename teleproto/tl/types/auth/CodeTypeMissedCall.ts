import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CodeTypeMissedCall extends TLObject {
    static CONSTRUCTOR_ID = 3592083182;
    static SUBCLASS_OF_ID = 3019105281;
    static className = "auth.CodeTypeMissedCall";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3592083182, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CodeTypeMissedCall {
        const args: any = {};
        return new CodeTypeMissedCall(args);
    }
}