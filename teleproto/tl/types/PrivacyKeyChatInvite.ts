import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyKeyChatInvite extends TLObject {
    static CONSTRUCTOR_ID = 1343122938;
    static SUBCLASS_OF_ID = 2185646531;
    static className = "PrivacyKeyChatInvite";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1343122938, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyKeyChatInvite {
        const args: any = {};
        return new PrivacyKeyChatInvite(args);
    }
}