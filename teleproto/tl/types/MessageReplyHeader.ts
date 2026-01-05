import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeMessageFwdHeader } from "./TypeMessageFwdHeader";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class MessageReplyHeader extends TLObject {
    static CONSTRUCTOR_ID = 1763137035;
    static SUBCLASS_OF_ID = 1531810151;
    static className = "MessageReplyHeader";
    static classType = "constructor";

    flags!: number;
    replyToScheduled?: boolean;
    forumTopic?: boolean;
    quote?: boolean;
    replyToMsgId?: number;
    replyToPeerId?: TypePeer;
    replyFrom?: TypeMessageFwdHeader;
    replyMedia?: TypeMessageMedia;
    replyToTopId?: number;
    quoteText?: string;
    quoteEntities?: TypeMessageEntity[];
    quoteOffset?: number;
    todoItemId?: number;

    constructor(args: { flags?: number, replyToScheduled?: boolean, forumTopic?: boolean, quote?: boolean, replyToMsgId?: number, replyToPeerId?: TypePeer, replyFrom?: TypeMessageFwdHeader, replyMedia?: TypeMessageMedia, replyToTopId?: number, quoteText?: string, quoteEntities?: TypeMessageEntity[], quoteOffset?: number, todoItemId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.replyToScheduled = args.replyToScheduled;
        this.forumTopic = args.forumTopic;
        this.quote = args.quote;
        this.replyToMsgId = args.replyToMsgId;
        this.replyToPeerId = args.replyToPeerId;
        this.replyFrom = args.replyFrom;
        this.replyMedia = args.replyMedia;
        this.replyToTopId = args.replyToTopId;
        this.quoteText = args.quoteText;
        this.quoteEntities = args.quoteEntities;
        this.quoteOffset = args.quoteOffset;
        this.todoItemId = args.todoItemId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1763137035, false);
        let flags = 0;
        if (this.replyToScheduled) { flags |= 1 << 2; }
        if (this.forumTopic) { flags |= 1 << 3; }
        if (this.quote) { flags |= 1 << 9; }
        if (this.replyToMsgId !== undefined && this.replyToMsgId !== null) { flags |= 1 << 4; }
        if (this.replyToPeerId !== undefined && this.replyToPeerId !== null) { flags |= 1 << 0; }
        if (this.replyFrom !== undefined && this.replyFrom !== null) { flags |= 1 << 5; }
        if (this.replyMedia !== undefined && this.replyMedia !== null) { flags |= 1 << 8; }
        if (this.replyToTopId !== undefined && this.replyToTopId !== null) { flags |= 1 << 1; }
        if (this.quoteText !== undefined && this.quoteText !== null) { flags |= 1 << 6; }
        if (this.quoteEntities !== undefined && this.quoteEntities !== null) { flags |= 1 << 7; }
        if (this.quoteOffset !== undefined && this.quoteOffset !== null) { flags |= 1 << 10; }
        if (this.todoItemId !== undefined && this.todoItemId !== null) { flags |= 1 << 11; }
        writer.writeInt(flags, false);
        if (this.replyToScheduled !== undefined && this.replyToScheduled !== null) {
        }
        if (this.forumTopic !== undefined && this.forumTopic !== null) {
        }
        if (this.quote !== undefined && this.quote !== null) {
        }
        if (this.replyToMsgId !== undefined && this.replyToMsgId !== null) {
            writer.writeInt(this.replyToMsgId);
        }
        if (this.replyToPeerId !== undefined && this.replyToPeerId !== null) {
            writer.write(this.replyToPeerId.getBytes());
        }
        if (this.replyFrom !== undefined && this.replyFrom !== null) {
            writer.write(this.replyFrom.getBytes());
        }
        if (this.replyMedia !== undefined && this.replyMedia !== null) {
            writer.write(this.replyMedia.getBytes());
        }
        if (this.replyToTopId !== undefined && this.replyToTopId !== null) {
            writer.writeInt(this.replyToTopId);
        }
        if (this.quoteText !== undefined && this.quoteText !== null) {
            writer.tgWriteString(this.quoteText);
        }
        if (this.quoteEntities !== undefined && this.quoteEntities !== null) {
            writer.writeVector(this.quoteEntities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.quoteOffset !== undefined && this.quoteOffset !== null) {
            writer.writeInt(this.quoteOffset);
        }
        if (this.todoItemId !== undefined && this.todoItemId !== null) {
            writer.writeInt(this.todoItemId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageReplyHeader {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _replyToScheduled = true;
            args.replyToScheduled = _replyToScheduled;
        } else {
            args.replyToScheduled = false;
        }
        if (args.flags & (1 << 3)) {
            const _forumTopic = true;
            args.forumTopic = _forumTopic;
        } else {
            args.forumTopic = false;
        }
        if (args.flags & (1 << 9)) {
            const _quote = true;
            args.quote = _quote;
        } else {
            args.quote = false;
        }
        if (args.flags & (1 << 4)) {
            const _replyToMsgId = reader.readInt();
            args.replyToMsgId = _replyToMsgId;
        } else {
            args.replyToMsgId = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _replyToPeerId = reader.tgReadObject();
            args.replyToPeerId = _replyToPeerId;
        } else {
            args.replyToPeerId = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _replyFrom = reader.tgReadObject();
            args.replyFrom = _replyFrom;
        } else {
            args.replyFrom = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _replyMedia = reader.tgReadObject();
            args.replyMedia = _replyMedia;
        } else {
            args.replyMedia = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _replyToTopId = reader.readInt();
            args.replyToTopId = _replyToTopId;
        } else {
            args.replyToTopId = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _quoteText = reader.tgReadString();
            args.quoteText = _quoteText;
        } else {
            args.quoteText = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _quoteEntities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.quoteEntities = _quoteEntities;
        } else {
            args.quoteEntities = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _quoteOffset = reader.readInt();
            args.quoteOffset = _quoteOffset;
        } else {
            args.quoteOffset = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _todoItemId = reader.readInt();
            args.todoItemId = _todoItemId;
        } else {
            args.todoItemId = undefined;
        }
        return new MessageReplyHeader(args);
    }
}