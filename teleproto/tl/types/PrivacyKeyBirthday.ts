import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyBirthday extends TLObject {
    static CONSTRUCTOR_ID = 536913176;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyBirthday";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(536913176, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyBirthday {
        const args: any = {};
        return new PrivacyKeyBirthday(args);
    }
}