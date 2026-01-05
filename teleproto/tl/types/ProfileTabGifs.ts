import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabGifs extends TLObject {
    static CONSTRUCTOR_ID = 2730555029;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabGifs";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2730555029, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabGifs {
        const args: any = {};
        return new ProfileTabGifs(args);
    }
}