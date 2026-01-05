import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueDisallowAll extends TLObject {
    static CONSTRUCTOR_ID = 3597362889;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueDisallowAll";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3597362889, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueDisallowAll {
        const args: any = {};
        return new InputPrivacyValueDisallowAll(args);
    }
}