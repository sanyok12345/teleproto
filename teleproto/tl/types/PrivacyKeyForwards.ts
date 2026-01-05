import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyForwards extends TLObject {
    static CONSTRUCTOR_ID = 1777096355;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyForwards";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1777096355, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyForwards {
        const args: any = {};
        return new PrivacyKeyForwards(args);
    }
}