import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";
import { TypeMessageReactions } from "./TypeMessageReactions";

export class UpdateMessageReactions extends TLObject {
    static CONSTRUCTOR_ID = 506035194;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateMessageReactions";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    msgId!: MessageIDLike;
    topMsgId?: number;
    savedPeerId?: TypePeer;
    reactions!: TypeMessageReactions;

    constructor(args: { flags?: number, peer?: TypePeer, msgId?: MessageIDLike, topMsgId?: number, savedPeerId?: TypePeer, reactions?: TypeMessageReactions } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.topMsgId = args.topMsgId;
        this.savedPeerId = args.savedPeerId;
        this.reactions = args.reactions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(506035194, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write(this.savedPeerId.getBytes());
        }
        writer.write(this.reactions.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateMessageReactions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        const _reactions = reader.tgReadObject();
        args.reactions = _reactions;
        return new UpdateMessageReactions(args);
    }
}