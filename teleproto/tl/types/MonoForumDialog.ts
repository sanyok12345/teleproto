import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeDraftMessage } from "./TypeDraftMessage";

export class MonoForumDialog extends TLObject {
    static CONSTRUCTOR_ID = 1681948327;
    static SUBCLASS_OF_ID = 599418118;
    static className = "MonoForumDialog";
    static classType = "constructor";

    flags!: number;
    unreadMark?: boolean;
    nopaidMessagesException?: boolean;
    peer!: TypePeer;
    topMessage!: number;
    readInboxMaxId!: number;
    readOutboxMaxId!: number;
    unreadCount!: number;
    unreadReactionsCount!: number;
    draft?: TypeDraftMessage;

    constructor(args: { flags?: number, unreadMark?: boolean, nopaidMessagesException?: boolean, peer?: TypePeer, topMessage?: number, readInboxMaxId?: number, readOutboxMaxId?: number, unreadCount?: number, unreadReactionsCount?: number, draft?: TypeDraftMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.unreadMark = args.unreadMark;
        this.nopaidMessagesException = args.nopaidMessagesException;
        this.peer = args.peer!;
        this.topMessage = args.topMessage!;
        this.readInboxMaxId = args.readInboxMaxId!;
        this.readOutboxMaxId = args.readOutboxMaxId!;
        this.unreadCount = args.unreadCount!;
        this.unreadReactionsCount = args.unreadReactionsCount!;
        this.draft = args.draft;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1681948327, false);
        let flags = 0;
        if (this.unreadMark) { flags |= 1 << 3; }
        if (this.nopaidMessagesException) { flags |= 1 << 4; }
        if (this.draft !== undefined && this.draft !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.unreadMark !== undefined && this.unreadMark !== null) {
        }
        if (this.nopaidMessagesException !== undefined && this.nopaidMessagesException !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topMessage);
        writer.writeInt(this.readInboxMaxId);
        writer.writeInt(this.readOutboxMaxId);
        writer.writeInt(this.unreadCount);
        writer.writeInt(this.unreadReactionsCount);
        if (this.draft !== undefined && this.draft !== null) {
            writer.write(this.draft.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MonoForumDialog {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _unreadMark = true;
            args.unreadMark = _unreadMark;
        } else {
            args.unreadMark = false;
        }
        if (args.flags & (1 << 4)) {
            const _nopaidMessagesException = true;
            args.nopaidMessagesException = _nopaidMessagesException;
        } else {
            args.nopaidMessagesException = false;
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
        const _unreadReactionsCount = reader.readInt();
        args.unreadReactionsCount = _unreadReactionsCount;
        if (args.flags & (1 << 1)) {
            const _draft = reader.tgReadObject();
            args.draft = _draft;
        } else {
            args.draft = undefined;
        }
        return new MonoForumDialog(args);
    }
}