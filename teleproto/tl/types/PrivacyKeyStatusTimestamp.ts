import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyStatusTimestamp extends TLObject {
    static CONSTRUCTOR_ID = 3157175088;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyStatusTimestamp";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3157175088, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyStatusTimestamp {
        const args: any = {};
        return new PrivacyKeyStatusTimestamp(args);
    }
}