import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateRecentEmojiStatuses extends TLObject {
    static CONSTRUCTOR_ID = 821314523;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateRecentEmojiStatuses";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(821314523, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateRecentEmojiStatuses {
        const args: any = {};
        return new UpdateRecentEmojiStatuses(args);
    }
}