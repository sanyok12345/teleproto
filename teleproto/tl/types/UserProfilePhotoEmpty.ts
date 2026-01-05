import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UserProfilePhotoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1326562017;
    static SUBCLASS_OF_ID = 3325267837;
    static className = "UserProfilePhotoEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1326562017, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserProfilePhotoEmpty {
        const args: any = {};
        return new UserProfilePhotoEmpty(args);
    }
}