import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EmojiGroupsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1874111879;
    static SUBCLASS_OF_ID = 2127189465;
    static className = "messages.EmojiGroupsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1874111879, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGroupsNotModified {
        const args: any = {};
        return new EmojiGroupsNotModified(args);
    }
}