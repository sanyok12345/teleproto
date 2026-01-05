import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class JoinAsPeers extends TLObject {
    static CONSTRUCTOR_ID = 2951045695;
    static SUBCLASS_OF_ID = 3031920891;
    static className = "phone.JoinAsPeers";
    static classType = "constructor";

    peers!: TypePeer[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { peers?: TypePeer[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.peers = args.peers!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2951045695, false);
        writer.writeVector(this.peers, (item) => {
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

    static fromReader(reader: BinaryReader): JoinAsPeers {
        const args: any = {};
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
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
        return new JoinAsPeers(args);
    }
}