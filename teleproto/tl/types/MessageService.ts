import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeMessageReplyHeader } from "./TypeMessageReplyHeader";
import { TypeMessageAction } from "./TypeMessageAction";
import { TypeMessageReactions } from "./TypeMessageReactions";

export class MessageService extends TLObject {
    static CONSTRUCTOR_ID = 2055212554;
    static SUBCLASS_OF_ID = 2030045667;
    static className = "MessageService";
    static classType = "constructor";

    flags!: number;
    out?: boolean;
    mentioned?: boolean;
    mediaUnread?: boolean;
    reactionsArePossible?: boolean;
    silent?: boolean;
    post?: boolean;
    legacy?: boolean;
    id!: number;
    fromId?: TypePeer;
    peerId!: TypePeer;
    savedPeerId?: TypePeer;
    replyTo?: TypeMessageReplyHeader;
    date!: number;
    action!: TypeMessageAction;
    reactions?: TypeMessageReactions;
    ttlPeriod?: number;

    constructor(args: { flags?: number, out?: boolean, mentioned?: boolean, mediaUnread?: boolean, reactionsArePossible?: boolean, silent?: boolean, post?: boolean, legacy?: boolean, id?: number, fromId?: TypePeer, peerId?: TypePeer, savedPeerId?: TypePeer, replyTo?: TypeMessageReplyHeader, date?: number, action?: TypeMessageAction, reactions?: TypeMessageReactions, ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.out = args.out;
        this.mentioned = args.mentioned;
        this.mediaUnread = args.mediaUnread;
        this.reactionsArePossible = args.reactionsArePossible;
        this.silent = args.silent;
        this.post = args.post;
        this.legacy = args.legacy;
        this.id = args.id!;
        this.fromId = args.fromId;
        this.peerId = args.peerId!;
        this.savedPeerId = args.savedPeerId;
        this.replyTo = args.replyTo;
        this.date = args.date!;
        this.action = args.action!;
        this.reactions = args.reactions;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2055212554, false);
        let flags = 0;
        if (this.out) { flags |= 1 << 1; }
        if (this.mentioned) { flags |= 1 << 4; }
        if (this.mediaUnread) { flags |= 1 << 5; }
        if (this.reactionsArePossible) { flags |= 1 << 9; }
        if (this.silent) { flags |= 1 << 13; }
        if (this.post) { flags |= 1 << 14; }
        if (this.legacy) { flags |= 1 << 19; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 8; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 28; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 3; }
        if (this.reactions !== undefined && this.reactions !== null) { flags |= 1 << 20; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 25; }
        writer.writeInt(flags, false);
        if (this.out !== undefined && this.out !== null) {
        }
        if (this.mentioned !== undefined && this.mentioned !== null) {
        }
        if (this.mediaUnread !== undefined && this.mediaUnread !== null) {
        }
        if (this.reactionsArePossible !== undefined && this.reactionsArePossible !== null) {
        }
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.post !== undefined && this.post !== null) {
        }
        if (this.legacy !== undefined && this.legacy !== null) {
        }
        writer.writeInt(this.id);
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        writer.write(this.peerId.getBytes());
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write(this.savedPeerId.getBytes());
        }
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        writer.writeInt(this.date);
        writer.write(this.action.getBytes());
        if (this.reactions !== undefined && this.reactions !== null) {
            writer.write(this.reactions.getBytes());
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageService {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _out = true;
            args.out = _out;
        } else {
            args.out = false;
        }
        if (args.flags & (1 << 4)) {
            const _mentioned = true;
            args.mentioned = _mentioned;
        } else {
            args.mentioned = false;
        }
        if (args.flags & (1 << 5)) {
            const _mediaUnread = true;
            args.mediaUnread = _mediaUnread;
        } else {
            args.mediaUnread = false;
        }
        if (args.flags & (1 << 9)) {
            const _reactionsArePossible = true;
            args.reactionsArePossible = _reactionsArePossible;
        } else {
            args.reactionsArePossible = false;
        }
        if (args.flags & (1 << 13)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        if (args.flags & (1 << 14)) {
            const _post = true;
            args.post = _post;
        } else {
            args.post = false;
        }
        if (args.flags & (1 << 19)) {
            const _legacy = true;
            args.legacy = _legacy;
        } else {
            args.legacy = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 8)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        if (args.flags & (1 << 28)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _action = reader.tgReadObject();
        args.action = _action;
        if (args.flags & (1 << 20)) {
            const _reactions = reader.tgReadObject();
            args.reactions = _reactions;
        } else {
            args.reactions = undefined;
        }
        if (args.flags & (1 << 25)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new MessageService(args);
    }
}