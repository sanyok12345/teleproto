import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeFolder } from "./TypeFolder";
import { TypePeer } from "./TypePeer";

export class DialogFolder extends TLObject {
    static CONSTRUCTOR_ID = 1908216652;
    static SUBCLASS_OF_ID = 1120787796;
    static className = "DialogFolder";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    folder!: TypeFolder;
    peer!: TypePeer;
    topMessage!: number;
    unreadMutedPeersCount!: number;
    unreadUnmutedPeersCount!: number;
    unreadMutedMessagesCount!: number;
    unreadUnmutedMessagesCount!: number;

    constructor(args: { flags?: number, pinned?: boolean, folder?: TypeFolder, peer?: TypePeer, topMessage?: number, unreadMutedPeersCount?: number, unreadUnmutedPeersCount?: number, unreadMutedMessagesCount?: number, unreadUnmutedMessagesCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.folder = args.folder!;
        this.peer = args.peer!;
        this.topMessage = args.topMessage!;
        this.unreadMutedPeersCount = args.unreadMutedPeersCount!;
        this.unreadUnmutedPeersCount = args.unreadUnmutedPeersCount!;
        this.unreadMutedMessagesCount = args.unreadMutedMessagesCount!;
        this.unreadUnmutedMessagesCount = args.unreadUnmutedMessagesCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1908216652, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        writer.write(this.folder.getBytes());
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topMessage);
        writer.writeInt(this.unreadMutedPeersCount);
        writer.writeInt(this.unreadUnmutedPeersCount);
        writer.writeInt(this.unreadMutedMessagesCount);
        writer.writeInt(this.unreadUnmutedMessagesCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogFolder {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        const _folder = reader.tgReadObject();
        args.folder = _folder;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topMessage = reader.readInt();
        args.topMessage = _topMessage;
        const _unreadMutedPeersCount = reader.readInt();
        args.unreadMutedPeersCount = _unreadMutedPeersCount;
        const _unreadUnmutedPeersCount = reader.readInt();
        args.unreadUnmutedPeersCount = _unreadUnmutedPeersCount;
        const _unreadMutedMessagesCount = reader.readInt();
        args.unreadMutedMessagesCount = _unreadMutedMessagesCount;
        const _unreadUnmutedMessagesCount = reader.readInt();
        args.unreadUnmutedMessagesCount = _unreadUnmutedMessagesCount;
        return new DialogFolder(args);
    }
}