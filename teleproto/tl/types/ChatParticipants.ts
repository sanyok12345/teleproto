import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatParticipant } from "./TypeChatParticipant";

export class ChatParticipants extends TLObject {
    static CONSTRUCTOR_ID = 1018991608;
    static SUBCLASS_OF_ID = 531142001;
    static className = "ChatParticipants";
    static classType = "constructor";

    chatId!: bigint;
    participants!: TypeChatParticipant[];
    version!: number;

    constructor(args: { chatId?: bigint, participants?: TypeChatParticipant[], version?: number } = {}) {
        super();
        this.chatId = args.chatId!;
        this.participants = args.participants!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1018991608, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.writeVector(this.participants, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatParticipants {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _participants = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.participants = _participants;
        const _version = reader.readInt();
        args.version = _version;
        return new ChatParticipants(args);
    }
}