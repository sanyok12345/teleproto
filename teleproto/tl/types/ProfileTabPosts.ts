import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabPosts extends TLObject {
    static CONSTRUCTOR_ID = 3113014934;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabPosts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3113014934, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabPosts {
        const args: any = {};
        return new ProfileTabPosts(args);
    }
}