import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ResolvedPeer extends TLObject {
    static CONSTRUCTOR_ID = 2131196633;
    static SUBCLASS_OF_ID = 4033196968;
    static className = "contacts.ResolvedPeer";
    static classType = "constructor";

    peer!: TypePeer;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { peer?: TypePeer, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.peer = args.peer!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2131196633, false);
        writer.write(this.peer.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResolvedPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
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
        return new ResolvedPeer(args);
    }
}