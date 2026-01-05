import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadChannelDiscussionOutbox extends TLObject {
    static CONSTRUCTOR_ID = 1767677564;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadChannelDiscussionOutbox";
    static classType = "constructor";

    channelId!: bigint;
    topMsgId!: number;
    readMaxId!: number;

    constructor(args: { channelId?: bigint, topMsgId?: number, readMaxId?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.topMsgId = args.topMsgId!;
        this.readMaxId = args.readMaxId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1767677564, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.topMsgId);
        writer.writeInt(this.readMaxId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadChannelDiscussionOutbox {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _topMsgId = reader.readInt();
        args.topMsgId = _topMsgId;
        const _readMaxId = reader.readInt();
        args.readMaxId = _readMaxId;
        return new UpdateReadChannelDiscussionOutbox(args);
    }
}