import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyStarGiftsAutoSave extends TLObject {
    static CONSTRUCTOR_ID = 749010424;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyStarGiftsAutoSave";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(749010424, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyStarGiftsAutoSave {
        const args: any = {};
        return new PrivacyKeyStarGiftsAutoSave(args);
    }
}