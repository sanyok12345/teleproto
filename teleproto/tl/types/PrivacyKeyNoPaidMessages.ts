import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyNoPaidMessages extends TLObject {
    static CONSTRUCTOR_ID = 399722706;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyNoPaidMessages";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(399722706, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyNoPaidMessages {
        const args: any = {};
        return new PrivacyKeyNoPaidMessages(args);
    }
}