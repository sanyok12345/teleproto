import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabVoice extends TLObject {
    static CONSTRUCTOR_ID = 3833006382;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabVoice";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3833006382, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabVoice {
        const args: any = {};
        return new ProfileTabVoice(args);
    }
}