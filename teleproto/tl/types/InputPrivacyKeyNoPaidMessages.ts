import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyNoPaidMessages extends TLObject {
    static CONSTRUCTOR_ID = 3183843252;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyNoPaidMessages";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3183843252, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyNoPaidMessages {
        const args: any = {};
        return new InputPrivacyKeyNoPaidMessages(args);
    }
}