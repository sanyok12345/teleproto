import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessagePeerVote } from "../TypeMessagePeerVote";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class VotesList extends TLObject {
    static CONSTRUCTOR_ID = 1218005070;
    static SUBCLASS_OF_ID = 3256457349;
    static className = "messages.VotesList";
    static classType = "constructor";

    flags!: number;
    count!: number;
    votes!: TypeMessagePeerVote[];
    chats!: TypeChat[];
    users!: TypeUser[];
    nextOffset?: string;

    constructor(args: { flags?: number, count?: number, votes?: TypeMessagePeerVote[], chats?: TypeChat[], users?: TypeUser[], nextOffset?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.count = args.count!;
        this.votes = args.votes!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.nextOffset = args.nextOffset;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1218005070, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.count);
        writer.writeVector(this.votes, (item) => {
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

    static fromReader(reader: BinaryReader): VotesList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _count = reader.readInt();
        args.count = _count;
        const _votes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.votes = _votes;
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
        return new VotesList(args);
    }
}