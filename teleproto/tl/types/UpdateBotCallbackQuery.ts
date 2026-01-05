import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";

export class UpdateBotCallbackQuery extends TLObject {
    static CONSTRUCTOR_ID = 3117401229;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotCallbackQuery";
    static classType = "constructor";

    flags!: number;
    queryId!: bigint;
    userId!: bigint;
    peer!: TypePeer;
    msgId!: MessageIDLike;
    chatInstance!: bigint;
    data?: Buffer;
    gameShortName?: string;

    constructor(args: { flags?: number, queryId?: bigint, userId?: bigint, peer?: TypePeer, msgId?: MessageIDLike, chatInstance?: bigint, data?: Buffer, gameShortName?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.queryId = args.queryId!;
        this.userId = args.userId!;
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.chatInstance = args.chatInstance!;
        this.data = args.data;
        this.gameShortName = args.gameShortName;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3117401229, false);
        let flags = 0;
        if (this.data !== undefined && this.data !== null) { flags |= 1 << 0; }
        if (this.gameShortName !== undefined && this.gameShortName !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeLargeInt(this.chatInstance, 64);
        if (this.data !== undefined && this.data !== null) {
            writer.tgWriteBytes(this.data);
        }
        if (this.gameShortName !== undefined && this.gameShortName !== null) {
            writer.tgWriteString(this.gameShortName);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotCallbackQuery {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _chatInstance = reader.readLargeInt(64);
        args.chatInstance = _chatInstance;
        if (args.flags & (1 << 0)) {
            const _data = reader.tgReadBytes();
            args.data = _data;
        } else {
            args.data = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _gameShortName = reader.tgReadString();
            args.gameShortName = _gameShortName;
        } else {
            args.gameShortName = undefined;
        }
        return new UpdateBotCallbackQuery(args);
    }
}