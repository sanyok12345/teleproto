import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUserFull } from "../TypeUserFull";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class UserFull extends TLObject {
    static CONSTRUCTOR_ID = 997004590;
    static SUBCLASS_OF_ID = 2212470261;
    static className = "users.UserFull";
    static classType = "constructor";

    fullUser!: TypeUserFull;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { fullUser?: TypeUserFull, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.fullUser = args.fullUser!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(997004590, false);
        writer.write(this.fullUser.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserFull {
        const args: any = {};
        const _fullUser = reader.tgReadObject();
        args.fullUser = _fullUser;
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
        return new UserFull(args);
    }
}