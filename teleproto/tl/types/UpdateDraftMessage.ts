import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeDraftMessage } from "./TypeDraftMessage";

export class UpdateDraftMessage extends TLObject {
    static CONSTRUCTOR_ID = 3992719646;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDraftMessage";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    topMsgId?: number;
    savedPeerId?: TypePeer;
    draft!: TypeDraftMessage;

    constructor(args: { flags?: number, peer?: TypePeer, topMsgId?: number, savedPeerId?: TypePeer, draft?: TypeDraftMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.topMsgId = args.topMsgId;
        this.savedPeerId = args.savedPeerId;
        this.draft = args.draft!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3992719646, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write(this.savedPeerId.getBytes());
        }
        writer.write(this.draft.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDraftMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
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
        const _draft = reader.tgReadObject();
        args.draft = _draft;
        return new UpdateDraftMessage(args);
    }
}