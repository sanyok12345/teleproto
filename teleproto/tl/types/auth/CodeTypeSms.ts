import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CodeTypeSms extends TLObject {
    static CONSTRUCTOR_ID = 1923290508;
    static SUBCLASS_OF_ID = 3019105281;
    static className = "auth.CodeTypeSms";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1923290508, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CodeTypeSms {
        const args: any = {};
        return new CodeTypeSms(args);
    }
}