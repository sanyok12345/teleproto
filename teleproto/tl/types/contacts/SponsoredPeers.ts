import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSponsoredPeer } from "../TypeSponsoredPeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class SponsoredPeers extends TLObject {
    static CONSTRUCTOR_ID = 3942852740;
    static SUBCLASS_OF_ID = 3026017484;
    static className = "contacts.SponsoredPeers";
    static classType = "constructor";

    peers!: TypeSponsoredPeer[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { peers?: TypeSponsoredPeer[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.peers = args.peers!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3942852740, false);
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

    static fromReader(reader: BinaryReader): SponsoredPeers {
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
        return new SponsoredPeers(args);
    }
}