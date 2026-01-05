import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeBusinessChatLink } from "../TypeBusinessChatLink";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class BusinessChatLinks extends TLObject {
    static CONSTRUCTOR_ID = 3963855569;
    static SUBCLASS_OF_ID = 3334097457;
    static className = "account.BusinessChatLinks";
    static classType = "constructor";

    links!: TypeBusinessChatLink[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { links?: TypeBusinessChatLink[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.links = args.links!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3963855569, false);
        writer.writeVector(this.links, (item) => {
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

    static fromReader(reader: BinaryReader): BusinessChatLinks {
        const args: any = {};
        const _links = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.links = _links;
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
        return new BusinessChatLinks(args);
    }
}