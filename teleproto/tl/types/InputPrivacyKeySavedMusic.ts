import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeySavedMusic extends TLObject {
    static CONSTRUCTOR_ID = 1304334886;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeySavedMusic";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1304334886, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeySavedMusic {
        const args: any = {};
        return new InputPrivacyKeySavedMusic(args);
    }
}