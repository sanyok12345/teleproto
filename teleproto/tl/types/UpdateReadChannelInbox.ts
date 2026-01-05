import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadChannelInbox extends TLObject {
    static CONSTRUCTOR_ID = 2452516368;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadChannelInbox";
    static classType = "constructor";

    flags!: number;
    folderId?: number;
    channelId!: bigint;
    maxId!: number;
    stillUnreadCount!: number;
    pts!: number;

    constructor(args: { flags?: number, folderId?: number, channelId?: bigint, maxId?: number, stillUnreadCount?: number, pts?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.folderId = args.folderId;
        this.channelId = args.channelId!;
        this.maxId = args.maxId!;
        this.stillUnreadCount = args.stillUnreadCount!;
        this.pts = args.pts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2452516368, false);
        let flags = 0;
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.maxId);
        writer.writeInt(this.stillUnreadCount);
        writer.writeInt(this.pts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadChannelInbox {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        const _stillUnreadCount = reader.readInt();
        args.stillUnreadCount = _stillUnreadCount;
        const _pts = reader.readInt();
        args.pts = _pts;
        return new UpdateReadChannelInbox(args);
    }
}