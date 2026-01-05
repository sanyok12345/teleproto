import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePublicForward } from "../TypePublicForward";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class PublicForwards extends TLObject {
    static CONSTRUCTOR_ID = 2466479648;
    static SUBCLASS_OF_ID = 2804429329;
    static className = "stats.PublicForwards";
    static classType = "constructor";

    flags!: number;
    count!: number;
    forwards!: TypePublicForward[];
    nextOffset?: string;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, count?: number, forwards?: TypePublicForward[], nextOffset?: string, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.forwards = args.forwards!;
        this.nextOffset = args.nextOffset;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2466479648, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.forwards, (item) => {
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

    static fromReader(reader: BinaryReader): PublicForwards {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _forwards = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.forwards = _forwards;
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
        return new PublicForwards(args);
    }
}