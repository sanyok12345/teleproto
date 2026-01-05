import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class InputReplyToMessage extends TLObject {
    static CONSTRUCTOR_ID = 2258615824;
    static SUBCLASS_OF_ID = 2356220701;
    static className = "InputReplyToMessage";
    static classType = "constructor";

    flags!: number;
    replyToMsgId!: number;
    topMsgId?: number;
    replyToPeerId?: TypeInputPeer;
    quoteText?: string;
    quoteEntities?: TypeMessageEntity[];
    quoteOffset?: number;
    monoforumPeerId?: TypeInputPeer;
    todoItemId?: number;

    constructor(args: { flags?: number, replyToMsgId?: number, topMsgId?: number, replyToPeerId?: TypeInputPeer, quoteText?: string, quoteEntities?: TypeMessageEntity[], quoteOffset?: number, monoforumPeerId?: TypeInputPeer, todoItemId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.replyToMsgId = args.replyToMsgId!;
        this.topMsgId = args.topMsgId;
        this.replyToPeerId = args.replyToPeerId;
        this.quoteText = args.quoteText;
        this.quoteEntities = args.quoteEntities;
        this.quoteOffset = args.quoteOffset;
        this.monoforumPeerId = args.monoforumPeerId;
        this.todoItemId = args.todoItemId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2258615824, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        if (this.replyToPeerId !== undefined && this.replyToPeerId !== null) { flags |= 1 << 1; }
        if (this.quoteText !== undefined && this.quoteText !== null) { flags |= 1 << 2; }
        if (this.quoteEntities !== undefined && this.quoteEntities !== null) { flags |= 1 << 3; }
        if (this.quoteOffset !== undefined && this.quoteOffset !== null) { flags |= 1 << 4; }
        if (this.monoforumPeerId !== undefined && this.monoforumPeerId !== null) { flags |= 1 << 5; }
        if (this.todoItemId !== undefined && this.todoItemId !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        writer.writeInt(this.replyToMsgId);
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        if (this.replyToPeerId !== undefined && this.replyToPeerId !== null) {
            writer.write(this.replyToPeerId.getBytes());
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
        if (this.monoforumPeerId !== undefined && this.monoforumPeerId !== null) {
            writer.write(this.monoforumPeerId.getBytes());
        }
        if (this.todoItemId !== undefined && this.todoItemId !== null) {
            writer.writeInt(this.todoItemId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReplyToMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _replyToMsgId = reader.readInt();
        args.replyToMsgId = _replyToMsgId;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _replyToPeerId = reader.tgReadObject();
            args.replyToPeerId = _replyToPeerId;
        } else {
            args.replyToPeerId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _quoteText = reader.tgReadString();
            args.quoteText = _quoteText;
        } else {
            args.quoteText = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _quoteEntities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.quoteEntities = _quoteEntities;
        } else {
            args.quoteEntities = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _quoteOffset = reader.readInt();
            args.quoteOffset = _quoteOffset;
        } else {
            args.quoteOffset = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _monoforumPeerId = reader.tgReadObject();
            args.monoforumPeerId = _monoforumPeerId;
        } else {
            args.monoforumPeerId = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _todoItemId = reader.readInt();
            args.todoItemId = _todoItemId;
        } else {
            args.todoItemId = undefined;
        }
        return new InputReplyToMessage(args);
    }
}