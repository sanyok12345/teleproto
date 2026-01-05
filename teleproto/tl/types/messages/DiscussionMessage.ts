import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessage } from "../TypeMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class DiscussionMessage extends TLObject {
    static CONSTRUCTOR_ID = 2788431746;
    static SUBCLASS_OF_ID = 1408820200;
    static className = "messages.DiscussionMessage";
    static classType = "constructor";

    flags!: number;
    messages!: TypeMessage[];
    maxId?: number;
    readInboxMaxId?: number;
    readOutboxMaxId?: number;
    unreadCount!: number;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, messages?: TypeMessage[], maxId?: number, readInboxMaxId?: number, readOutboxMaxId?: number, unreadCount?: number, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.messages = args.messages!;
        this.maxId = args.maxId;
        this.readInboxMaxId = args.readInboxMaxId;
        this.readOutboxMaxId = args.readOutboxMaxId;
        this.unreadCount = args.unreadCount!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2788431746, false);
        let flags = 0;
        if (this.maxId !== undefined && this.maxId !== null) { flags |= 1 << 0; }
        if (this.readInboxMaxId !== undefined && this.readInboxMaxId !== null) { flags |= 1 << 1; }
        if (this.readOutboxMaxId !== undefined && this.readOutboxMaxId !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeVector(this.messages, (item) => {
            writer.write(item.getBytes());
        });
        if (this.maxId !== undefined && this.maxId !== null) {
            writer.writeInt(this.maxId);
        }
        if (this.readInboxMaxId !== undefined && this.readInboxMaxId !== null) {
            writer.writeInt(this.readInboxMaxId);
        }
        if (this.readOutboxMaxId !== undefined && this.readOutboxMaxId !== null) {
            writer.writeInt(this.readOutboxMaxId);
        }
        writer.writeInt(this.unreadCount);
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DiscussionMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _messages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.messages = _messages;
        if (args.flags & (1 << 0)) {
            const _maxId = reader.readInt();
            args.maxId = _maxId;
        } else {
            args.maxId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _readInboxMaxId = reader.readInt();
            args.readInboxMaxId = _readInboxMaxId;
        } else {
            args.readInboxMaxId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _readOutboxMaxId = reader.readInt();
            args.readOutboxMaxId = _readOutboxMaxId;
        } else {
            args.readOutboxMaxId = undefined;
        }
        const _unreadCount = reader.readInt();
        args.unreadCount = _unreadCount;
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
        return new DiscussionMessage(args);
    }
}