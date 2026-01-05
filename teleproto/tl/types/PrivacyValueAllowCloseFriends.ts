import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueAllowCloseFriends extends TLObject {
    static CONSTRUCTOR_ID = 4159232155;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueAllowCloseFriends";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4159232155, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueAllowCloseFriends {
        const args: any = {};
        return new PrivacyValueAllowCloseFriends(args);
    }
}