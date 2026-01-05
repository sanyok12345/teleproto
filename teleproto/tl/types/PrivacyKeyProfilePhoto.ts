import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyProfilePhoto extends TLObject {
    static CONSTRUCTOR_ID = 2517966829;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyProfilePhoto";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2517966829, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyProfilePhoto {
        const args: any = {};
        return new PrivacyKeyProfilePhoto(args);
    }
}