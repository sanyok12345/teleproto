import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeQuickReply } from "../TypeQuickReply";
import { TypeMessage } from "../TypeMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class QuickReplies extends TLObject {
    static CONSTRUCTOR_ID = 3331155605;
    static SUBCLASS_OF_ID = 4147636582;
    static className = "messages.QuickReplies";
    static classType = "constructor";

    quickReplies!: TypeQuickReply[];
    messages!: TypeMessage[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { quickReplies?: TypeQuickReply[], messages?: TypeMessage[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.quickReplies = args.quickReplies!;
        this.messages = args.messages!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3331155605, false);
        writer.writeVector(this.quickReplies, (item) => {
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
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): QuickReplies {
        const args: any = {};
        const _quickReplies = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.quickReplies = _quickReplies;
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
        return new QuickReplies(args);
    }
}