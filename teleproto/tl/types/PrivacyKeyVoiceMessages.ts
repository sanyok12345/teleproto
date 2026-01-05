import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyVoiceMessages extends TLObject {
    static CONSTRUCTOR_ID = 110621716;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyVoiceMessages";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(110621716, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyVoiceMessages {
        const args: any = {};
        return new PrivacyKeyVoiceMessages(args);
    }
}