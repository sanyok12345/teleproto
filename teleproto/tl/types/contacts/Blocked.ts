import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerBlocked } from "../TypePeerBlocked";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class Blocked extends TLObject {
    static CONSTRUCTOR_ID = 182326673;
    static SUBCLASS_OF_ID = 4290400079;
    static className = "contacts.Blocked";
    static classType = "constructor";

    blocked!: TypePeerBlocked[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { blocked?: TypePeerBlocked[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.blocked = args.blocked!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(182326673, false);
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

    static fromReader(reader: BinaryReader): Blocked {
        const args: any = {};
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
        return new Blocked(args);
    }
}