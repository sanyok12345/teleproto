import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypePeerNotifySettings } from "./TypePeerNotifySettings";
import { TypeDraftMessage } from "./TypeDraftMessage";

export class ForumTopic extends TLObject {
    static CONSTRUCTOR_ID = 3456044746;
    static SUBCLASS_OF_ID = 2367169027;
    static className = "ForumTopic";
    static classType = "constructor";

    flags!: number;
    my?: boolean;
    closed?: boolean;
    pinned?: boolean;
    short?: boolean;
    hidden?: boolean;
    titleMissing?: boolean;
    id!: number;
    date!: number;
    peer!: TypePeer;
    title!: string;
    iconColor!: number;
    iconEmojiId?: bigint;
    topMessage!: number;
    readInboxMaxId!: number;
    readOutboxMaxId!: number;
    unreadCount!: number;
    unreadMentionsCount!: number;
    unreadReactionsCount!: number;
    fromId!: TypePeer;
    notifySettings!: TypePeerNotifySettings;
    draft?: TypeDraftMessage;

    constructor(args: { flags?: number, my?: boolean, closed?: boolean, pinned?: boolean, short?: boolean, hidden?: boolean, titleMissing?: boolean, id?: number, date?: number, peer?: TypePeer, title?: string, iconColor?: number, iconEmojiId?: bigint, topMessage?: number, readInboxMaxId?: number, readOutboxMaxId?: number, unreadCount?: number, unreadMentionsCount?: number, unreadReactionsCount?: number, fromId?: TypePeer, notifySettings?: TypePeerNotifySettings, draft?: TypeDraftMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.my = args.my;
        this.closed = args.closed;
        this.pinned = args.pinned;
        this.short = args.short;
        this.hidden = args.hidden;
        this.titleMissing = args.titleMissing;
        this.id = args.id!;
        this.date = args.date!;
        this.peer = args.peer!;
        this.title = args.title!;
        this.iconColor = args.iconColor!;
        this.iconEmojiId = args.iconEmojiId;
        this.topMessage = args.topMessage!;
        this.readInboxMaxId = args.readInboxMaxId!;
        this.readOutboxMaxId = args.readOutboxMaxId!;
        this.unreadCount = args.unreadCount!;
        this.unreadMentionsCount = args.unreadMentionsCount!;
        this.unreadReactionsCount = args.unreadReactionsCount!;
        this.fromId = args.fromId!;
        this.notifySettings = args.notifySettings!;
        this.draft = args.draft;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3456044746, false);
        let flags = 0;
        if (this.my) { flags |= 1 << 1; }
        if (this.closed) { flags |= 1 << 2; }
        if (this.pinned) { flags |= 1 << 3; }
        if (this.short) { flags |= 1 << 5; }
        if (this.hidden) { flags |= 1 << 6; }
        if (this.titleMissing) { flags |= 1 << 7; }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) { flags |= 1 << 0; }
        if (this.draft !== undefined && this.draft !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.my !== undefined && this.my !== null) {
        }
        if (this.closed !== undefined && this.closed !== null) {
        }
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.short !== undefined && this.short !== null) {
        }
        if (this.hidden !== undefined && this.hidden !== null) {
        }
        if (this.titleMissing !== undefined && this.titleMissing !== null) {
        }
        writer.writeInt(this.id);
        writer.writeInt(this.date);
        writer.write(this.peer.getBytes());
        writer.tgWriteString(this.title);
        writer.writeInt(this.iconColor);
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) {
            writer.writeLargeInt(this.iconEmojiId, 64);
        }
        writer.writeInt(this.topMessage);
        writer.writeInt(this.readInboxMaxId);
        writer.writeInt(this.readOutboxMaxId);
        writer.writeInt(this.unreadCount);
        writer.writeInt(this.unreadMentionsCount);
        writer.writeInt(this.unreadReactionsCount);
        writer.write(this.fromId.getBytes());
        writer.write(this.notifySettings.getBytes());
        if (this.draft !== undefined && this.draft !== null) {
            writer.write(this.draft.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ForumTopic {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _my = true;
            args.my = _my;
        } else {
            args.my = false;
        }
        if (args.flags & (1 << 2)) {
            const _closed = true;
            args.closed = _closed;
        } else {
            args.closed = false;
        }
        if (args.flags & (1 << 3)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 5)) {
            const _short = true;
            args.short = _short;
        } else {
            args.short = false;
        }
        if (args.flags & (1 << 6)) {
            const _hidden = true;
            args.hidden = _hidden;
        } else {
            args.hidden = false;
        }
        if (args.flags & (1 << 7)) {
            const _titleMissing = true;
            args.titleMissing = _titleMissing;
        } else {
            args.titleMissing = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _date = reader.readInt();
        args.date = _date;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _title = reader.tgReadString();
        args.title = _title;
        const _iconColor = reader.readInt();
        args.iconColor = _iconColor;
        if (args.flags & (1 << 0)) {
            const _iconEmojiId = reader.readLargeInt(64);
            args.iconEmojiId = _iconEmojiId;
        } else {
            args.iconEmojiId = undefined;
        }
        const _topMessage = reader.readInt();
        args.topMessage = _topMessage;
        const _readInboxMaxId = reader.readInt();
        args.readInboxMaxId = _readInboxMaxId;
        const _readOutboxMaxId = reader.readInt();
        args.readOutboxMaxId = _readOutboxMaxId;
        const _unreadCount = reader.readInt();
        args.unreadCount = _unreadCount;
        const _unreadMentionsCount = reader.readInt();
        args.unreadMentionsCount = _unreadMentionsCount;
        const _unreadReactionsCount = reader.readInt();
        args.unreadReactionsCount = _unreadReactionsCount;
        const _fromId = reader.tgReadObject();
        args.fromId = _fromId;
        const _notifySettings = reader.tgReadObject();
        args.notifySettings = _notifySettings;
        if (args.flags & (1 << 4)) {
            const _draft = reader.tgReadObject();
            args.draft = _draft;
        } else {
            args.draft = undefined;
        }
        return new ForumTopic(args);
    }
}