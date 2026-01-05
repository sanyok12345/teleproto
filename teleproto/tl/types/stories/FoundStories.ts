import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeFoundStory } from "../TypeFoundStory";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class FoundStories extends TLObject {
    static CONSTRUCTOR_ID = 3806230327;
    static SUBCLASS_OF_ID = 393808693;
    static className = "stories.FoundStories";
    static classType = "constructor";

    flags!: number;
    count!: number;
    stories!: TypeFoundStory[];
    nextOffset?: string;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, count?: number, stories?: TypeFoundStory[], nextOffset?: string, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.stories = args.stories!;
        this.nextOffset = args.nextOffset;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3806230327, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.stories, (item) => {
            writer.write(item.getBytes());
        });
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FoundStories {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _stories = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stories = _stories;
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
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
        return new FoundStories(args);
    }
}