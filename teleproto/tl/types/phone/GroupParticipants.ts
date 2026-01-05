import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeGroupCallParticipant } from "../TypeGroupCallParticipant";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class GroupParticipants extends TLObject {
    static CONSTRUCTOR_ID = 4101460406;
    static SUBCLASS_OF_ID = 1926431988;
    static className = "phone.GroupParticipants";
    static classType = "constructor";

    count!: number;
    participants!: TypeGroupCallParticipant[];
    nextOffset!: string;
    chats!: TypeChat[];
    users!: TypeUser[];
    version!: number;

    constructor(args: { count?: number, participants?: TypeGroupCallParticipant[], nextOffset?: string, chats?: TypeChat[], users?: TypeUser[], version?: number } = {}) {
        super();
        this.count = args.count!;
        this.participants = args.participants!;
        this.nextOffset = args.nextOffset!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4101460406, false);
        writer.writeInt(this.count);
        writer.writeVector(this.participants, (item) => {
            writer.write(item.getBytes());
        });
        writer.tgWriteString(this.nextOffset);
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupParticipants {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _participants = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.participants = _participants;
        const _nextOffset = reader.tgReadString();
        args.nextOffset = _nextOffset;
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
        const _version = reader.readInt();
        args.version = _version;
        return new GroupParticipants(args);
    }
}