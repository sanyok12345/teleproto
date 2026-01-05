import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChatTheme } from "../TypeChatTheme";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChatThemes extends TLObject {
    static CONSTRUCTOR_ID = 3188294003;
    static SUBCLASS_OF_ID = 364989096;
    static className = "account.ChatThemes";
    static classType = "constructor";

    flags!: number;
    hash!: bigint;
    themes!: TypeChatTheme[];
    chats!: TypeChat[];
    users!: TypeUser[];
    nextOffset?: string;

    constructor(args: { flags?: number, hash?: bigint, themes?: TypeChatTheme[], chats?: TypeChat[], users?: TypeUser[], nextOffset?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.hash = args.hash!;
        this.themes = args.themes!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.nextOffset = args.nextOffset;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3188294003, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.themes, (item) => {
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

    static fromReader(reader: BinaryReader): ChatThemes {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _themes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.themes = _themes;
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
        return new ChatThemes(args);
    }
}