import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabMedia extends TLObject {
    static CONSTRUCTOR_ID = 1925597525;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabMedia";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1925597525, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabMedia {
        const args: any = {};
        return new ProfileTabMedia(args);
    }
}