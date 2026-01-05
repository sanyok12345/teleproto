import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyChatInvite extends TLObject {
    static CONSTRUCTOR_ID = 3187344422;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyChatInvite";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3187344422, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyChatInvite {
        const args: any = {};
        return new InputPrivacyKeyChatInvite(args);
    }
}