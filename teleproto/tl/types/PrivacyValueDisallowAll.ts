import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueDisallowAll extends TLObject {
    static CONSTRUCTOR_ID = 2339628899;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueDisallowAll";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2339628899, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueDisallowAll {
        const args: any = {};
        return new PrivacyValueDisallowAll(args);
    }
}