import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadChannelDiscussionInbox extends TLObject {
    static CONSTRUCTOR_ID = 3601962310;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadChannelDiscussionInbox";
    static classType = "constructor";

    flags!: number;
    channelId!: bigint;
    topMsgId!: number;
    readMaxId!: number;
    broadcastId?: bigint;
    broadcastPost?: number;

    constructor(args: { flags?: number, channelId?: bigint, topMsgId?: number, readMaxId?: number, broadcastId?: bigint, broadcastPost?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.channelId = args.channelId!;
        this.topMsgId = args.topMsgId!;
        this.readMaxId = args.readMaxId!;
        this.broadcastId = args.broadcastId;
        this.broadcastPost = args.broadcastPost;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3601962310, false);
        let flags = 0;
        if (this.broadcastId !== undefined && this.broadcastId !== null) { flags |= 1 << 0; }
        if (this.broadcastPost !== undefined && this.broadcastPost !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.topMsgId);
        writer.writeInt(this.readMaxId);
        if (this.broadcastId !== undefined && this.broadcastId !== null) {
            writer.writeLargeInt(this.broadcastId, 64);
        }
        if (this.broadcastPost !== undefined && this.broadcastPost !== null) {
            writer.writeInt(this.broadcastPost);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadChannelDiscussionInbox {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _topMsgId = reader.readInt();
        args.topMsgId = _topMsgId;
        const _readMaxId = reader.readInt();
        args.readMaxId = _readMaxId;
        if (args.flags & (1 << 0)) {
            const _broadcastId = reader.readLargeInt(64);
            args.broadcastId = _broadcastId;
        } else {
            args.broadcastId = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _broadcastPost = reader.readInt();
            args.broadcastPost = _broadcastPost;
        } else {
            args.broadcastPost = undefined;
        }
        return new UpdateReadChannelDiscussionInbox(args);
    }
}