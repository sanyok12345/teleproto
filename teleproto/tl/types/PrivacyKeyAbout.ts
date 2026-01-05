import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyAbout extends TLObject {
    static CONSTRUCTOR_ID = 2760292193;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyAbout";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2760292193, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyAbout {
        const args: any = {};
        return new PrivacyKeyAbout(args);
    }
}