import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ProfileTabFiles extends TLObject {
    static CONSTRUCTOR_ID = 2872286208;
    static SUBCLASS_OF_ID = 2924007860;
    static className = "ProfileTabFiles";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2872286208, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ProfileTabFiles {
        const args: any = {};
        return new ProfileTabFiles(args);
    }
}