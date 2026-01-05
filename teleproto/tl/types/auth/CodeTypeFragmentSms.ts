import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CodeTypeFragmentSms extends TLObject {
    static CONSTRUCTOR_ID = 116234636;
    static SUBCLASS_OF_ID = 3019105281;
    static className = "auth.CodeTypeFragmentSms";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(116234636, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CodeTypeFragmentSms {
        const args: any = {};
        return new CodeTypeFragmentSms(args);
    }
}