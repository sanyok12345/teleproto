import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyProfilePhoto extends TLObject {
    static CONSTRUCTOR_ID = 1461304012;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyProfilePhoto";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1461304012, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyProfilePhoto {
        const args: any = {};
        return new InputPrivacyKeyProfilePhoto(args);
    }
}