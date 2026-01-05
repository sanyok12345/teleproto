import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueAllowAll extends TLObject {
    static CONSTRUCTOR_ID = 407582158;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueAllowAll";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(407582158, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueAllowAll {
        const args: any = {};
        return new InputPrivacyValueAllowAll(args);
    }
}