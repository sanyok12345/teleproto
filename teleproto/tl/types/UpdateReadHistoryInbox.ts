import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateReadHistoryInbox extends TLObject {
    static CONSTRUCTOR_ID = 2659499161;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadHistoryInbox";
    static classType = "constructor";

    flags!: number;
    folderId?: number;
    peer!: TypePeer;
    topMsgId?: number;
    maxId!: number;
    stillUnreadCount!: number;
    pts!: number;
    ptsCount!: number;

    constructor(args: { flags?: number, folderId?: number, peer?: TypePeer, topMsgId?: number, maxId?: number, stillUnreadCount?: number, pts?: number, ptsCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.folderId = args.folderId;
        this.peer = args.peer!;
        this.topMsgId = args.topMsgId;
        this.maxId = args.maxId!;
        this.stillUnreadCount = args.stillUnreadCount!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2659499161, false);
        let flags = 0;
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 0; }
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        writer.write(this.peer.getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.writeInt(this.maxId);
        writer.writeInt(this.stillUnreadCount);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadHistoryInbox {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 1)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        const _stillUnreadCount = reader.readInt();
        args.stillUnreadCount = _stillUnreadCount;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateReadHistoryInbox(args);
    }
}