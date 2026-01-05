import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessage } from "../TypeMessage";
import { TypeForumTopic } from "../TypeForumTopic";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class Messages extends TLObject {
    static CONSTRUCTOR_ID = 494135274;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.Messages";
    static classType = "constructor";

    messages!: TypeMessage[];
    topics!: TypeForumTopic[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { messages?: TypeMessage[], topics?: TypeForumTopic[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.messages = args.messages!;
        this.topics = args.topics!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(494135274, false);
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

    static fromReader(reader: BinaryReader): Messages {
        const args: any = {};
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
        return new Messages(args);
    }
}