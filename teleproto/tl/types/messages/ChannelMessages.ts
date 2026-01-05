import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessage } from "../TypeMessage";
import { TypeForumTopic } from "../TypeForumTopic";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChannelMessages extends TLObject {
    static CONSTRUCTOR_ID = 3346446926;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.ChannelMessages";
    static classType = "constructor";

    flags!: number;
    inexact?: boolean;
    pts!: number;
    count!: number;
    offsetIdOffset?: number;
    messages!: TypeMessage[];
    topics!: TypeForumTopic[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, inexact?: boolean, pts?: number, count?: number, offsetIdOffset?: number, messages?: TypeMessage[], topics?: TypeForumTopic[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.inexact = args.inexact;
        this.pts = args.pts!;
        this.count = args.count!;
        this.offsetIdOffset = args.offsetIdOffset;
        this.messages = args.messages!;
        this.topics = args.topics!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3346446926, false);
        let flags = 0;
        if (this.inexact) { flags |= 1 << 1; }
        if (this.offsetIdOffset !== undefined && this.offsetIdOffset !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.inexact !== undefined && this.inexact !== null) {
        }
        writer.writeInt(this.pts);
        writer.writeInt(this.count);
        if (this.offsetIdOffset !== undefined && this.offsetIdOffset !== null) {
            writer.writeInt(this.offsetIdOffset);
        }
        writer.writeVector(this.messages, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.topics, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _inexact = true;
            args.inexact = _inexact;
        } else {
            args.inexact = false;
        }
        const _pts = reader.readInt();
        args.pts = _pts;
        const _count = reader.readInt();
        args.count = _count;
        if (args.flags & (1 << 2)) {
            const _offsetIdOffset = reader.readInt();
            args.offsetIdOffset = _offsetIdOffset;
        } else {
            args.offsetIdOffset = undefined;
        }
        const _messages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.messages = _messages;
        const _topics = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.topics = _topics;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ChannelMessages(args);
    }
}