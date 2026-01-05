import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageFwdHeader } from "./TypeMessageFwdHeader";
import { TypeMessageReplyHeader } from "./TypeMessageReplyHeader";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class UpdateShortChatMessage extends TLObject {
    static CONSTRUCTOR_ID = 1299050149;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "UpdateShortChatMessage";
    static classType = "constructor";

    flags!: number;
    out?: boolean;
    mentioned?: boolean;
    mediaUnread?: boolean;
    silent?: boolean;
    id!: number;
    fromId!: bigint;
    chatId!: bigint;
    message!: string;
    pts!: number;
    ptsCount!: number;
    date!: number;
    fwdFrom?: TypeMessageFwdHeader;
    viaBotId?: bigint;
    replyTo?: TypeMessageReplyHeader;
    entities?: TypeMessageEntity[];
    ttlPeriod?: number;

    constructor(args: { flags?: number, out?: boolean, mentioned?: boolean, mediaUnread?: boolean, silent?: boolean, id?: number, fromId?: bigint, chatId?: bigint, message?: string, pts?: number, ptsCount?: number, date?: number, fwdFrom?: TypeMessageFwdHeader, viaBotId?: bigint, replyTo?: TypeMessageReplyHeader, entities?: TypeMessageEntity[], ttlPeriod?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.out = args.out;
        this.mentioned = args.mentioned;
        this.mediaUnread = args.mediaUnread;
        this.silent = args.silent;
        this.id = args.id!;
        this.fromId = args.fromId!;
        this.chatId = args.chatId!;
        this.message = args.message!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
        this.date = args.date!;
        this.fwdFrom = args.fwdFrom;
        this.viaBotId = args.viaBotId;
        this.replyTo = args.replyTo;
        this.entities = args.entities;
        this.ttlPeriod = args.ttlPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1299050149, false);
        let flags = 0;
        if (this.out) { flags |= 1 << 1; }
        if (this.mentioned) { flags |= 1 << 4; }
        if (this.mediaUnread) { flags |= 1 << 5; }
        if (this.silent) { flags |= 1 << 13; }
        if (this.fwdFrom !== undefined && this.fwdFrom !== null) { flags |= 1 << 2; }
        if (this.viaBotId !== undefined && this.viaBotId !== null) { flags |= 1 << 11; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 3; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 7; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 25; }
        writer.writeInt(flags, false);
        if (this.out !== undefined && this.out !== null) {
        }
        if (this.mentioned !== undefined && this.mentioned !== null) {
        }
        if (this.mediaUnread !== undefined && this.mediaUnread !== null) {
        }
        if (this.silent !== undefined && this.silent !== null) {
        }
        writer.writeInt(this.id);
        writer.writeLargeInt(this.fromId, 64);
        writer.writeLargeInt(this.chatId, 64);
        writer.tgWriteString(this.message);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        writer.writeInt(this.date);
        if (this.fwdFrom !== undefined && this.fwdFrom !== null) {
            writer.write(this.fwdFrom.getBytes());
        }
        if (this.viaBotId !== undefined && this.viaBotId !== null) {
            writer.writeLargeInt(this.viaBotId, 64);
        }
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateShortChatMessage {
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
        if (args.flags & (1 << 13)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _fromId = reader.readLargeInt(64);
        args.fromId = _fromId;
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _message = reader.tgReadString();
        args.message = _message;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 2)) {
            const _fwdFrom = reader.tgReadObject();
            args.fwdFrom = _fwdFrom;
        } else {
            args.fwdFrom = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _viaBotId = reader.readLargeInt(64);
            args.viaBotId = _viaBotId;
        } else {
            args.viaBotId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 25)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        return new UpdateShortChatMessage(args);
    }
}