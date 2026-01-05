import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSearchPostsFlood } from "../TypeSearchPostsFlood";
import { TypeMessage } from "../TypeMessage";
import { TypeForumTopic } from "../TypeForumTopic";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class MessagesSlice extends TLObject {
    static CONSTRUCTOR_ID = 1595959062;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.MessagesSlice";
    static classType = "constructor";

    flags!: number;
    inexact?: boolean;
    count!: number;
    nextRate?: number;
    offsetIdOffset?: number;
    searchFlood?: TypeSearchPostsFlood;
    messages!: TypeMessage[];
    topics!: TypeForumTopic[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, inexact?: boolean, count?: number, nextRate?: number, offsetIdOffset?: number, searchFlood?: TypeSearchPostsFlood, messages?: TypeMessage[], topics?: TypeForumTopic[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.inexact = args.inexact;
        this.count = args.count!;
        this.nextRate = args.nextRate;
        this.offsetIdOffset = args.offsetIdOffset;
        this.searchFlood = args.searchFlood;
        this.messages = args.messages!;
        this.topics = args.topics!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1595959062, false);
        let flags = 0;
        if (this.inexact) { flags |= 1 << 1; }
        if (this.nextRate !== undefined && this.nextRate !== null) { flags |= 1 << 0; }
        if (this.offsetIdOffset !== undefined && this.offsetIdOffset !== null) { flags |= 1 << 2; }
        if (this.searchFlood !== undefined && this.searchFlood !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.inexact !== undefined && this.inexact !== null) {
        }
        writer.writeInt(this.count);
        if (this.nextRate !== undefined && this.nextRate !== null) {
            writer.writeInt(this.nextRate);
        }
        if (this.offsetIdOffset !== undefined && this.offsetIdOffset !== null) {
            writer.writeInt(this.offsetIdOffset);
        }
        if (this.searchFlood !== undefined && this.searchFlood !== null) {
            writer.write(this.searchFlood.getBytes());
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

    static fromReader(reader: BinaryReader): MessagesSlice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _inexact = true;
            args.inexact = _inexact;
        } else {
            args.inexact = false;
        }
        const _count = reader.readInt();
        args.count = _count;
        if (args.flags & (1 << 0)) {
            const _nextRate = reader.readInt();
            args.nextRate = _nextRate;
        } else {
            args.nextRate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _offsetIdOffset = reader.readInt();
            args.offsetIdOffset = _offsetIdOffset;
        } else {
            args.offsetIdOffset = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _searchFlood = reader.tgReadObject();
            args.searchFlood = _searchFlood;
        } else {
            args.searchFlood = undefined;
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
        return new MessagesSlice(args);
    }
}