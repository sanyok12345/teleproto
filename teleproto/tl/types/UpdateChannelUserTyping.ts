import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeSendMessageAction } from "./TypeSendMessageAction";

export class UpdateChannelUserTyping extends TLObject {
    static CONSTRUCTOR_ID = 2357774627;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelUserTyping";
    static classType = "constructor";

    flags!: number;
    channelId!: bigint;
    topMsgId?: number;
    fromId!: TypePeer;
    action!: TypeSendMessageAction;

    constructor(args: { flags?: number, channelId?: bigint, topMsgId?: number, fromId?: TypePeer, action?: TypeSendMessageAction } = {}) {
        super();
        this.flags = args.flags!;
        this.channelId = args.channelId!;
        this.topMsgId = args.topMsgId;
        this.fromId = args.fromId!;
        this.action = args.action!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2357774627, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.channelId, 64);
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.write(this.fromId.getBytes());
        writer.write(this.action.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelUserTyping {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _fromId = reader.tgReadObject();
        args.fromId = _fromId;
        const _action = reader.tgReadObject();
        args.action = _action;
        return new UpdateChannelUserTyping(args);
    }
}