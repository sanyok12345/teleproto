import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChatlistUpdates extends TLObject {
    static CONSTRUCTOR_ID = 2478671757;
    static SUBCLASS_OF_ID = 2098610666;
    static className = "chatlists.ChatlistUpdates";
    static classType = "constructor";

    missingPeers!: TypePeer[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { missingPeers?: TypePeer[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.missingPeers = args.missingPeers!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2478671757, false);
        writer.writeVector(this.missingPeers, (item) => {
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

    static fromReader(reader: BinaryReader): ChatlistUpdates {
        const args: any = {};
        const _missingPeers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.missingPeers = _missingPeers;
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
        return new ChatlistUpdates(args);
    }
}