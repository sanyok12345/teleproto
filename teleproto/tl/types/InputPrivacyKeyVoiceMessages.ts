import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyVoiceMessages extends TLObject {
    static CONSTRUCTOR_ID = 2934349160;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyVoiceMessages";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2934349160, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyVoiceMessages {
        const args: any = {};
        return new InputPrivacyKeyVoiceMessages(args);
    }
}