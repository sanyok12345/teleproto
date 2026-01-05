import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSavedStarGift } from "../TypeSavedStarGift";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class SavedStarGifts extends TLObject {
    static CONSTRUCTOR_ID = 2515765681;
    static SUBCLASS_OF_ID = 3574671511;
    static className = "payments.SavedStarGifts";
    static classType = "constructor";

    flags!: number;
    count!: number;
    chatNotificationsEnabled?: boolean;
    gifts!: TypeSavedStarGift[];
    nextOffset?: string;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, count?: number, chatNotificationsEnabled?: boolean, gifts?: TypeSavedStarGift[], nextOffset?: string, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.chatNotificationsEnabled = args.chatNotificationsEnabled;
        this.gifts = args.gifts!;
        this.nextOffset = args.nextOffset;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2515765681, false);
        let flags = 0;
        if (this.chatNotificationsEnabled !== undefined && this.chatNotificationsEnabled !== null) { flags |= 1 << 1; }
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        if (this.chatNotificationsEnabled !== undefined && this.chatNotificationsEnabled !== null) {
            writer.tgWriteBool(this.chatNotificationsEnabled);
        }
        writer.writeVector(this.gifts, (item) => {
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

    static fromReader(reader: BinaryReader): SavedStarGifts {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        if (args.flags & (1 << 1)) {
            const _chatNotificationsEnabled = reader.tgReadBool();
            args.chatNotificationsEnabled = _chatNotificationsEnabled;
        } else {
            args.chatNotificationsEnabled = undefined;
        }
        const _gifts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.gifts = _gifts;
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
        return new SavedStarGifts(args);
    }
}