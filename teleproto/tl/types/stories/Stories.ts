import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStoryItem } from "../TypeStoryItem";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class Stories extends TLObject {
    static CONSTRUCTOR_ID = 1673780490;
    static SUBCLASS_OF_ID = 622595116;
    static className = "stories.Stories";
    static classType = "constructor";

    flags!: number;
    count!: number;
    stories!: TypeStoryItem[];
    pinnedToTop?: number[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, count?: number, stories?: TypeStoryItem[], pinnedToTop?: number[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.stories = args.stories!;
        this.pinnedToTop = args.pinnedToTop;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1673780490, false);
        let flags = 0;
        if (this.pinnedToTop !== undefined && this.pinnedToTop !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.stories, (item) => {
            writer.write(item.getBytes());
        });
        if (this.pinnedToTop !== undefined && this.pinnedToTop !== null) {
            writer.writeVector(this.pinnedToTop, (item) => {
                writer.writeInt(item);
            });
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Stories {
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
            const _pinnedToTop = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.pinnedToTop = _pinnedToTop;
        } else {
            args.pinnedToTop = undefined;
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
        return new Stories(args);
    }
}