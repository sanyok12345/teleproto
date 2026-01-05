import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTopPeerCategoryPeers } from "../TypeTopPeerCategoryPeers";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class TopPeers extends TLObject {
    static CONSTRUCTOR_ID = 1891070632;
    static SUBCLASS_OF_ID = 2666052488;
    static className = "contacts.TopPeers";
    static classType = "constructor";

    categories!: TypeTopPeerCategoryPeers[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { categories?: TypeTopPeerCategoryPeers[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.categories = args.categories!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1891070632, false);
        writer.writeVector(this.categories, (item) => {
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

    static fromReader(reader: BinaryReader): TopPeers {
        const args: any = {};
        const _categories = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.categories = _categories;
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
        return new TopPeers(args);
    }
}