import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabLinks extends TLObject {
    static CONSTRUCTOR_ID = 3546637465;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabLinks";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3546637465, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabLinks {
        const args: any = {};
        return new ProfileTabLinks(args);
    }
}