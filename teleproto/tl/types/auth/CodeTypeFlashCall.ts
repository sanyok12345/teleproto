import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CodeTypeFlashCall extends TLObject {
    static CONSTRUCTOR_ID = 577556219;
    static SUBCLASS_OF_ID = 3019105281;
    static className = "auth.CodeTypeFlashCall";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(577556219, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CodeTypeFlashCall {
        const args: any = {};
        return new CodeTypeFlashCall(args);
    }
}