import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyStatusTimestamp extends TLObject {
    static CONSTRUCTOR_ID = 1335282456;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyStatusTimestamp";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1335282456, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyStatusTimestamp {
        const args: any = {};
        return new InputPrivacyKeyStatusTimestamp(args);
    }
}