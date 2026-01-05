import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class UpdateBusinessBotCallbackQuery extends TLObject {
    static CONSTRUCTOR_ID = 513998247;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBusinessBotCallbackQuery";
    static classType = "constructor";

    flags!: number;
    queryId!: bigint;
    userId!: bigint;
    connectionId!: string;
    message!: TypeMessage;
    replyToMessage?: TypeMessage;
    chatInstance!: bigint;
    data?: Buffer;

    constructor(args: { flags?: number, queryId?: bigint, userId?: bigint, connectionId?: string, message?: TypeMessage, replyToMessage?: TypeMessage, chatInstance?: bigint, data?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.queryId = args.queryId!;
        this.userId = args.userId!;
        this.connectionId = args.connectionId!;
        this.message = args.message!;
        this.replyToMessage = args.replyToMessage;
        this.chatInstance = args.chatInstance!;
        this.data = args.data;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(513998247, false);
        let flags = 0;
        if (this.replyToMessage !== undefined && this.replyToMessage !== null) { flags |= 1 << 2; }
        if (this.data !== undefined && this.data !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.connectionId);
        writer.write(this.message.getBytes());
        if (this.replyToMessage !== undefined && this.replyToMessage !== null) {
            writer.write(this.replyToMessage.getBytes());
        }
        writer.writeLargeInt(this.chatInstance, 64);
        if (this.data !== undefined && this.data !== null) {
            writer.tgWriteBytes(this.data);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBusinessBotCallbackQuery {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _connectionId = reader.tgReadString();
        args.connectionId = _connectionId;
        const _message = reader.tgReadObject();
        args.message = _message;
        if (args.flags & (1 << 2)) {
            const _replyToMessage = reader.tgReadObject();
            args.replyToMessage = _replyToMessage;
        } else {
            args.replyToMessage = undefined;
        }
        const _chatInstance = reader.readLargeInt(64);
        args.chatInstance = _chatInstance;
        if (args.flags & (1 << 0)) {
            const _data = reader.tgReadBytes();
            args.data = _data;
        } else {
            args.data = undefined;
        }
        return new UpdateBusinessBotCallbackQuery(args);
    }
}