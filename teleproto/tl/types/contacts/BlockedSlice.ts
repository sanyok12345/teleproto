import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerBlocked } from "../TypePeerBlocked";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class BlockedSlice extends TLObject {
    static CONSTRUCTOR_ID = 3781575060;
    static SUBCLASS_OF_ID = 4290400079;
    static className = "contacts.BlockedSlice";
    static classType = "constructor";

    count!: number;
    blocked!: TypePeerBlocked[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { count?: number, blocked?: TypePeerBlocked[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.blocked = args.blocked!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3781575060, false);
        writer.writeInt(this.count);
        writer.writeVector(this.blocked, (item) => {
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

    static fromReader(reader: BinaryReader): BlockedSlice {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _blocked = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocked = _blocked;
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
        return new BlockedSlice(args);
    }
}