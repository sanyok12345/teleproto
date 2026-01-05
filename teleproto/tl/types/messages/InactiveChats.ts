import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class InactiveChats extends TLObject {
    static CONSTRUCTOR_ID = 2837970629;
    static SUBCLASS_OF_ID = 2348013524;
    static className = "messages.InactiveChats";
    static classType = "constructor";

    dates!: number[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { dates?: number[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.dates = args.dates!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2837970629, false);
        writer.writeVector(this.dates, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InactiveChats {
        const args: any = {};
        const _dates = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.dates = _dates;
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
        return new InactiveChats(args);
    }
}