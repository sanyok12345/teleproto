import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { MessageIDLike } from "./../../define";

export class InputGroupCallInviteMessage extends TLObject {
    static CONSTRUCTOR_ID = 2349883455;
    static SUBCLASS_OF_ID = 1482758833;
    static className = "InputGroupCallInviteMessage";
    static classType = "constructor";

    msgId!: MessageIDLike;

    constructor(args: { msgId?: MessageIDLike } = {}) {
        super();
        this.msgId = args.msgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2349883455, false);
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputGroupCallInviteMessage {
        const args: any = {};
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new InputGroupCallInviteMessage(args);
    }
}