import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeGroupCall } from "../TypeGroupCall";
import { TypeGroupCallParticipant } from "../TypeGroupCallParticipant";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class GroupCall extends TLObject {
    static CONSTRUCTOR_ID = 2658302637;
    static SUBCLASS_OF_ID = 809572030;
    static className = "phone.GroupCall";
    static classType = "constructor";

    call!: TypeGroupCall;
    participants!: TypeGroupCallParticipant[];
    participantsNextOffset!: string;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { call?: TypeGroupCall, participants?: TypeGroupCallParticipant[], participantsNextOffset?: string, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.call = args.call!;
        this.participants = args.participants!;
        this.participantsNextOffset = args.participantsNextOffset!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2658302637, false);
        writer.write(this.call.getBytes());
        writer.writeVector(this.participants, (item) => {
            writer.write(item.getBytes());
        });
        writer.tgWriteString(this.participantsNextOffset);
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _participants = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.participants = _participants;
        const _participantsNextOffset = reader.tgReadString();
        args.participantsNextOffset = _participantsNextOffset;
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
        return new GroupCall(args);
    }
}