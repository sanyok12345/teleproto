import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedMusicIdsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1338514798;
    static SUBCLASS_OF_ID = 1263203986;
    static className = "account.SavedMusicIdsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1338514798, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedMusicIdsNotModified {
        const args: any = {};
        return new SavedMusicIdsNotModified(args);
    }
}