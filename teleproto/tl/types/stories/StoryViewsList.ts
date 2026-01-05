import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStoryView } from "../TypeStoryView";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class StoryViewsList extends TLObject {
    static CONSTRUCTOR_ID = 1507299269;
    static SUBCLASS_OF_ID = 3108205920;
    static className = "stories.StoryViewsList";
    static classType = "constructor";

    flags!: number;
    count!: number;
    viewsCount!: number;
    forwardsCount!: number;
    reactionsCount!: number;
    views!: TypeStoryView[];
    chats!: TypeChat[];
    users!: TypeUser[];
    nextOffset?: string;

    constructor(args: { flags?: number, count?: number, viewsCount?: number, forwardsCount?: number, reactionsCount?: number, views?: TypeStoryView[], chats?: TypeChat[], users?: TypeUser[], nextOffset?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.viewsCount = args.viewsCount!;
        this.forwardsCount = args.forwardsCount!;
        this.reactionsCount = args.reactionsCount!;
        this.views = args.views!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.nextOffset = args.nextOffset;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1507299269, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeInt(this.viewsCount);
        writer.writeInt(this.forwardsCount);
        writer.writeInt(this.reactionsCount);
        writer.writeVector(this.views, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryViewsList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _viewsCount = reader.readInt();
        args.viewsCount = _viewsCount;
        const _forwardsCount = reader.readInt();
        args.forwardsCount = _forwardsCount;
        const _reactionsCount = reader.readInt();
        args.reactionsCount = _reactionsCount;
        const _views = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.views = _views;
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
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        return new StoryViewsList(args);
    }
}