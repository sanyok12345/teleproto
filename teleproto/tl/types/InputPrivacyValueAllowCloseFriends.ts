import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyValueAllowCloseFriends extends TLObject {
    static CONSTRUCTOR_ID = 793067081;
    static SUBCLASS_OF_ID = 1513843490;
    static className = "InputPrivacyValueAllowCloseFriends";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(793067081, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyValueAllowCloseFriends {
        const args: any = {};
        return new InputPrivacyValueAllowCloseFriends(args);
    }
}