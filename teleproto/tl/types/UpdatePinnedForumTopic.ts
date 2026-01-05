import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdatePinnedForumTopic extends TLObject {
    static CONSTRUCTOR_ID = 1748708434;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePinnedForumTopic";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    peer!: TypePeer;
    topicId!: number;

    constructor(args: { flags?: number, pinned?: boolean, peer?: TypePeer, topicId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.peer = args.peer!;
        this.topicId = args.topicId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1748708434, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topicId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePinnedForumTopic {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topicId = reader.readInt();
        args.topicId = _topicId;
        return new UpdatePinnedForumTopic(args);
    }
}