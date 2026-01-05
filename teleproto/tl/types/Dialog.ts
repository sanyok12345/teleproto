import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypePeerNotifySettings } from "./TypePeerNotifySettings";
import { TypeDraftMessage } from "./TypeDraftMessage";

export class Dialog extends TLObject {
    static CONSTRUCTOR_ID = 3582593222;
    static SUBCLASS_OF_ID = 1120787796;
    static className = "Dialog";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    unreadMark?: boolean;
    viewForumAsMessages?: boolean;
    peer!: TypePeer;
    topMessage!: number;
    readInboxMaxId!: number;
    readOutboxMaxId!: number;
    unreadCount!: number;
    unreadMentionsCount!: number;
    unreadReactionsCount!: number;
    notifySettings!: TypePeerNotifySettings;
    pts?: number;
    draft?: TypeDraftMessage;
    folderId?: number;
    ttlPeriod?: number;

    constructor(args: { flags?: number, pinned?: boolean, unreadMark?: boolean, viewForumAsMessages?: boolean, peer?: TypePeer, topMessage?: number, readInboxMaxId?: number, readOutboxMaxId?: number, unreadCount?: number, unreadMentionsCount?: number, unreadReactionsCount?: number, notifySettings?: TypePeerNotifySettings, pts?: number, draft?: TypeDraftMessage, folderId?: number, ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.unreadMark = args.unreadMark;
        this.viewForumAsMessages = args.viewForumAsMessages;
        this.peer = args.peer!;
        this.topMessage = args.topMessage!;
        this.readInboxMaxId = args.readInboxMaxId!;
        this.readOutboxMaxId = args.readOutboxMaxId!;
        this.unreadCount = args.unreadCount!;
        this.unreadMentionsCount = args.unreadMentionsCount!;
        this.unreadReactionsCount = args.unreadReactionsCount!;
        this.notifySettings = args.notifySettings!;
        this.pts = args.pts;
        this.draft = args.draft;
        this.folderId = args.folderId;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3582593222, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 2; }
        if (this.unreadMark) { flags |= 1 << 3; }
        if (this.viewForumAsMessages) { flags |= 1 << 6; }
        if (this.pts !== undefined && this.pts !== null) { flags |= 1 << 0; }
        if (this.draft !== undefined && this.draft !== null) { flags |= 1 << 1; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 4; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.unreadMark !== undefined && this.unreadMark !== null) {
        }
        if (this.viewForumAsMessages !== undefined && this.viewForumAsMessages !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topMessage);
        writer.writeInt(this.readInboxMaxId);
        writer.writeInt(this.readOutboxMaxId);
        writer.writeInt(this.unreadCount);
        writer.writeInt(this.unreadMentionsCount);
        writer.writeInt(this.unreadReactionsCount);
        writer.write(this.notifySettings.getBytes());
        if (this.pts !== undefined && this.pts !== null) {
            writer.writeInt(this.pts);
        }
        if (this.draft !== undefined && this.draft !== null) {
            writer.write(this.draft.getBytes());
        }
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Dialog {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 3)) {
            const _unreadMark = true;
            args.unreadMark = _unreadMark;
        } else {
            args.unreadMark = false;
        }
        if (args.flags & (1 << 6)) {
            const _viewForumAsMessages = true;
            args.viewForumAsMessages = _viewForumAsMessages;
        } else {
            args.viewForumAsMessages = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
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
        const _notifySettings = reader.tgReadObject();
        args.notifySettings = _notifySettings;
        if (args.flags & (1 << 0)) {
            const _pts = reader.readInt();
            args.pts = _pts;
        } else {
            args.pts = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _draft = reader.tgReadObject();
            args.draft = _draft;
        } else {
            args.draft = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new Dialog(args);
    }
}