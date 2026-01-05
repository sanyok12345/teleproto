import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeSendMessageAction } from "./TypeSendMessageAction";

export class UpdateChatUserTyping extends TLObject {
    static CONSTRUCTOR_ID = 2202565360;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatUserTyping";
    static classType = "constructor";

    chatId!: bigint;
    fromId!: TypePeer;
    action!: TypeSendMessageAction;

    constructor(args: { chatId?: bigint, fromId?: TypePeer, action?: TypeSendMessageAction } = {}) {
        super();
        this.chatId = args.chatId!;
        this.fromId = args.fromId!;
        this.action = args.action!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2202565360, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.write(this.fromId.getBytes());
        writer.write(this.action.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatUserTyping {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _fromId = reader.tgReadObject();
        args.fromId = _fromId;
        const _action = reader.tgReadObject();
        args.action = _action;
        return new UpdateChatUserTyping(args);
    }
}