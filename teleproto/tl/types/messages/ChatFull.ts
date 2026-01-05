import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChatFull } from "../TypeChatFull";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChatFull extends TLObject {
    static CONSTRUCTOR_ID = 3856126364;
    static SUBCLASS_OF_ID = 576344329;
    static className = "messages.ChatFull";
    static classType = "constructor";

    fullChat!: TypeChatFull;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { fullChat?: TypeChatFull, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.fullChat = args.fullChat!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3856126364, false);
        writer.write(this.fullChat.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatFull {
        const args: any = {};
        const _fullChat = reader.tgReadObject();
        args.fullChat = _fullChat;
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
        return new ChatFull(args);
    }
}