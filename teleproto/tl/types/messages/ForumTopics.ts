import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeForumTopic } from "../TypeForumTopic";
import { TypeMessage } from "../TypeMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ForumTopics extends TLObject {
    static CONSTRUCTOR_ID = 913709011;
    static SUBCLASS_OF_ID = 2384281118;
    static className = "messages.ForumTopics";
    static classType = "constructor";

    flags!: number;
    orderByCreateDate?: boolean;
    count!: number;
    topics!: TypeForumTopic[];
    messages!: TypeMessage[];
    chats!: TypeChat[];
    users!: TypeUser[];
    pts!: number;

    constructor(args: { flags?: number, orderByCreateDate?: boolean, count?: number, topics?: TypeForumTopic[], messages?: TypeMessage[], chats?: TypeChat[], users?: TypeUser[], pts?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.orderByCreateDate = args.orderByCreateDate;
        this.count = args.count!;
        this.topics = args.topics!;
        this.messages = args.messages!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.pts = args.pts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(913709011, false);
        let flags = 0;
        if (this.orderByCreateDate) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.orderByCreateDate !== undefined && this.orderByCreateDate !== null) {
        }
        writer.writeInt(this.count);
        writer.writeVector(this.topics, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.messages, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.pts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ForumTopics {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _orderByCreateDate = true;
            args.orderByCreateDate = _orderByCreateDate;
        } else {
            args.orderByCreateDate = false;
        }
        const _count = reader.readInt();
        args.count = _count;
        const _topics = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.topics = _topics;
        const _messages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.messages = _messages;
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
        const _pts = reader.readInt();
        args.pts = _pts;
        return new ForumTopics(args);
    }
}