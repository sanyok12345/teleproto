import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyAbout extends TLObject {
    static CONSTRUCTOR_ID = 941870144;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyAbout";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(941870144, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyAbout {
        const args: any = {};
        return new InputPrivacyKeyAbout(args);
    }
}