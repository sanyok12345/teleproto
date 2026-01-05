import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChannelParticipant } from "../TypeChannelParticipant";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChannelParticipant extends TLObject {
    static CONSTRUCTOR_ID = 3753378583;
    static SUBCLASS_OF_ID = 1717048602;
    static className = "channels.ChannelParticipant";
    static classType = "constructor";

    participant!: TypeChannelParticipant;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { participant?: TypeChannelParticipant, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.participant = args.participant!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3753378583, false);
        writer.write(this.participant.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipant {
        const args: any = {};
        const _participant = reader.tgReadObject();
        args.participant = _participant;
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
        return new ChannelParticipant(args);
    }
}