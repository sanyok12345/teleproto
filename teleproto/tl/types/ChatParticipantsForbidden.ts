import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatParticipant } from "./TypeChatParticipant";

export class ChatParticipantsForbidden extends TLObject {
    static CONSTRUCTOR_ID = 2271466465;
    static SUBCLASS_OF_ID = 531142001;
    static className = "ChatParticipantsForbidden";
    static classType = "constructor";

    flags!: number;
    chatId!: bigint;
    selfParticipant?: TypeChatParticipant;

    constructor(args: { flags?: number, chatId?: bigint, selfParticipant?: TypeChatParticipant } = {}) {
        super();
        this.flags = args.flags!;
        this.chatId = args.chatId!;
        this.selfParticipant = args.selfParticipant;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2271466465, false);
        let flags = 0;
        if (this.selfParticipant !== undefined && this.selfParticipant !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.chatId, 64);
        if (this.selfParticipant !== undefined && this.selfParticipant !== null) {
            writer.write(this.selfParticipant.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatParticipantsForbidden {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        if (args.flags & (1 << 0)) {
            const _selfParticipant = reader.tgReadObject();
            args.selfParticipant = _selfParticipant;
        } else {
            args.selfParticipant = undefined;
        }
        return new ChatParticipantsForbidden(args);
    }
}