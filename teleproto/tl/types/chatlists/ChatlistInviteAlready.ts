import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChatlistInviteAlready extends TLObject {
    static CONSTRUCTOR_ID = 4203214425;
    static SUBCLASS_OF_ID = 1097993845;
    static className = "chatlists.ChatlistInviteAlready";
    static classType = "constructor";

    filterId!: number;
    missingPeers!: TypePeer[];
    alreadyPeers!: TypePeer[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { filterId?: number, missingPeers?: TypePeer[], alreadyPeers?: TypePeer[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.filterId = args.filterId!;
        this.missingPeers = args.missingPeers!;
        this.alreadyPeers = args.alreadyPeers!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4203214425, false);
        writer.writeInt(this.filterId);
        writer.writeVector(this.missingPeers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.alreadyPeers, (item) => {
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

    static fromReader(reader: BinaryReader): ChatlistInviteAlready {
        const args: any = {};
        const _filterId = reader.readInt();
        args.filterId = _filterId;
        const _missingPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.missingPeers = _missingPeers;
        const _alreadyPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.alreadyPeers = _alreadyPeers;
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
        return new ChatlistInviteAlready(args);
    }
}