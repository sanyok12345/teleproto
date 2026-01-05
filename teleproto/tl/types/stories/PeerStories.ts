import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerStories } from "../TypePeerStories";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class PeerStories extends TLObject {
    static CONSTRUCTOR_ID = 3404105576;
    static SUBCLASS_OF_ID = 2639712208;
    static className = "stories.PeerStories";
    static classType = "constructor";

    stories!: TypePeerStories;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { stories?: TypePeerStories, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.stories = args.stories!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3404105576, false);
        writer.write(this.stories.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerStories {
        const args: any = {};
        const _stories = reader.tgReadObject();
        args.stories = _stories;
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
        return new PeerStories(args);
    }
}