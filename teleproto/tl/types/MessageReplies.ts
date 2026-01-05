import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageReplies extends TLObject {
    static CONSTRUCTOR_ID = 2211844034;
    static SUBCLASS_OF_ID = 1825397986;
    static className = "MessageReplies";
    static classType = "constructor";

    flags!: number;
    comments?: boolean;
    replies!: number;
    repliesPts!: number;
    recentRepliers?: TypePeer[];
    channelId?: bigint;
    maxId?: number;
    readMaxId?: number;

    constructor(args: { flags?: number, comments?: boolean, replies?: number, repliesPts?: number, recentRepliers?: TypePeer[], channelId?: bigint, maxId?: number, readMaxId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.comments = args.comments;
        this.replies = args.replies!;
        this.repliesPts = args.repliesPts!;
        this.recentRepliers = args.recentRepliers;
        this.channelId = args.channelId;
        this.maxId = args.maxId;
        this.readMaxId = args.readMaxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2211844034, false);
        let flags = 0;
        if (this.comments) { flags |= 1 << 0; }
        if (this.recentRepliers !== undefined && this.recentRepliers !== null) { flags |= 1 << 1; }
        if (this.channelId !== undefined && this.channelId !== null) { flags |= 1 << 0; }
        if (this.maxId !== undefined && this.maxId !== null) { flags |= 1 << 2; }
        if (this.readMaxId !== undefined && this.readMaxId !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.comments !== undefined && this.comments !== null) {
        }
        writer.writeInt(this.replies);
        writer.writeInt(this.repliesPts);
        if (this.recentRepliers !== undefined && this.recentRepliers !== null) {
            writer.writeVector(this.recentRepliers, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.channelId !== undefined && this.channelId !== null) {
            writer.writeLargeInt(this.channelId, 64);
        }
        if (this.maxId !== undefined && this.maxId !== null) {
            writer.writeInt(this.maxId);
        }
        if (this.readMaxId !== undefined && this.readMaxId !== null) {
            writer.writeInt(this.readMaxId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageReplies {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _comments = true;
            args.comments = _comments;
        } else {
            args.comments = false;
        }
        const _replies = reader.readInt();
        args.replies = _replies;
        const _repliesPts = reader.readInt();
        args.repliesPts = _repliesPts;
        if (args.flags & (1 << 1)) {
            const _recentRepliers = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.recentRepliers = _recentRepliers;
        } else {
            args.recentRepliers = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _channelId = reader.readLargeInt(64);
            args.channelId = _channelId;
        } else {
            args.channelId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _maxId = reader.readInt();
            args.maxId = _maxId;
        } else {
            args.maxId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _readMaxId = reader.readInt();
            args.readMaxId = _readMaxId;
        } else {
            args.readMaxId = undefined;
        }
        return new MessageReplies(args);
    }
}