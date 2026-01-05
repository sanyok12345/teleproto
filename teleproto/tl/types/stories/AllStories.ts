import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerStories } from "../TypePeerStories";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";
import { TypeStoriesStealthMode } from "../TypeStoriesStealthMode";

export class AllStories extends TLObject {
    static CONSTRUCTOR_ID = 1862033025;
    static SUBCLASS_OF_ID = 2120274125;
    static className = "stories.AllStories";
    static classType = "constructor";

    flags!: number;
    hasMore?: boolean;
    count!: number;
    state!: string;
    peerStories!: TypePeerStories[];
    chats!: TypeChat[];
    users!: TypeUser[];
    stealthMode!: TypeStoriesStealthMode;

    constructor(args: { flags?: number, hasMore?: boolean, count?: number, state?: string, peerStories?: TypePeerStories[], chats?: TypeChat[], users?: TypeUser[], stealthMode?: TypeStoriesStealthMode } = {}) {
        super();
        this.flags = args.flags!;
        this.hasMore = args.hasMore;
        this.count = args.count!;
        this.state = args.state!;
        this.peerStories = args.peerStories!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.stealthMode = args.stealthMode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1862033025, false);
        let flags = 0;
        if (this.hasMore) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.hasMore !== undefined && this.hasMore !== null) {
        }
        writer.writeInt(this.count);
        writer.tgWriteString(this.state);
        writer.writeVector(this.peerStories, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.stealthMode.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AllStories {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hasMore = true;
            args.hasMore = _hasMore;
        } else {
            args.hasMore = false;
        }
        const _count = reader.readInt();
        args.count = _count;
        const _state = reader.tgReadString();
        args.state = _state;
        const _peerStories = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peerStories = _peerStories;
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
        const _stealthMode = reader.tgReadObject();
        args.stealthMode = _stealthMode;
        return new AllStories(args);
    }
}