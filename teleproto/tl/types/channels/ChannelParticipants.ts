import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChannelParticipant } from "../TypeChannelParticipant";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChannelParticipants extends TLObject {
    static CONSTRUCTOR_ID = 2595290799;
    static SUBCLASS_OF_ID = 3859443300;
    static className = "channels.ChannelParticipants";
    static classType = "constructor";

    count!: number;
    participants!: TypeChannelParticipant[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { count?: number, participants?: TypeChannelParticipant[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.participants = args.participants!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2595290799, false);
        writer.writeInt(this.count);
        writer.writeVector(this.participants, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipants {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _participants = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.participants = _participants;
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
        return new ChannelParticipants(args);
    }
}