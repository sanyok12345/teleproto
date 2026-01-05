import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyPhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 1030105979;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyPhoneCall";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1030105979, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyPhoneCall {
        const args: any = {};
        return new PrivacyKeyPhoneCall(args);
    }
}