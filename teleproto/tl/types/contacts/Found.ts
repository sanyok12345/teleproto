import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class Found extends TLObject {
    static CONSTRUCTOR_ID = 3004386717;
    static SUBCLASS_OF_ID = 1132896995;
    static className = "contacts.Found";
    static classType = "constructor";

    myResults!: TypePeer[];
    results!: TypePeer[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { myResults?: TypePeer[], results?: TypePeer[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.myResults = args.myResults!;
        this.results = args.results!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3004386717, false);
        writer.writeVector(this.myResults, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.results, (item) => {
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

    static fromReader(reader: BinaryReader): Found {
        const args: any = {};
        const _myResults = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.myResults = _myResults;
        const _results = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.results = _results;
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
        return new Found(args);
    }
}