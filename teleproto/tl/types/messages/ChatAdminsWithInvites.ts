import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChatAdminWithInvites } from "../TypeChatAdminWithInvites";
import { TypeUser } from "../TypeUser";

export class ChatAdminsWithInvites extends TLObject {
    static CONSTRUCTOR_ID = 3063640791;
    static SUBCLASS_OF_ID = 2405149995;
    static className = "messages.ChatAdminsWithInvites";
    static classType = "constructor";

    admins!: TypeChatAdminWithInvites[];
    users!: TypeUser[];

    constructor(args: { admins?: TypeChatAdminWithInvites[], users?: TypeUser[] } = {}) {
        super();
        this.admins = args.admins!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3063640791, false);
        writer.writeVector(this.admins, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatAdminsWithInvites {
        const args: any = {};
        const _admins = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.admins = _admins;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ChatAdminsWithInvites(args);
    }
}