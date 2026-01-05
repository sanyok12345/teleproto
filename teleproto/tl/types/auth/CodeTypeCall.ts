import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CodeTypeCall extends TLObject {
    static CONSTRUCTOR_ID = 1948046307;
    static SUBCLASS_OF_ID = 3019105281;
    static className = "auth.CodeTypeCall";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1948046307, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CodeTypeCall {
        const args: any = {};
        return new CodeTypeCall(args);
    }
}