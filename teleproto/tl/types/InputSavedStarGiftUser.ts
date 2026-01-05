import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { MessageIDLike } from "./../../define";

export class InputSavedStarGiftUser extends TLObject {
    static CONSTRUCTOR_ID = 1764202389;
    static SUBCLASS_OF_ID = 2406848942;
    static className = "InputSavedStarGiftUser";
    static classType = "constructor";

    msgId!: MessageIDLike;

    constructor(args: { msgId?: MessageIDLike } = {}) {
        super();
        this.msgId = args.msgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1764202389, false);
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputSavedStarGiftUser {
        const args: any = {};
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new InputSavedStarGiftUser(args);
    }
}