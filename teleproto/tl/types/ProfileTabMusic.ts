import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabMusic extends TLObject {
    static CONSTRUCTOR_ID = 2670187118;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabMusic";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2670187118, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabMusic {
        const args: any = {};
        return new ProfileTabMusic(args);
    }
}