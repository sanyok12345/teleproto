import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStickerSetEmojiChannelDefaultStatuses extends TLObject {
    static CONSTRUCTOR_ID = 1232373075;
    static SUBCLASS_OF_ID = 1034127786;
    static className = "InputStickerSetEmojiChannelDefaultStatuses";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1232373075, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetEmojiChannelDefaultStatuses {
        const args: any = {};
        return new InputStickerSetEmojiChannelDefaultStatuses(args);
    }
}