import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChatParticipantDelete extends TLObject {
    static CONSTRUCTOR_ID = 3811523959;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatParticipantDelete";
    static classType = "constructor";

    chatId!: bigint;
    userId!: bigint;
    version!: number;

    constructor(args: { chatId?: bigint, userId?: bigint, version?: number } = {}) {
        super();
        this.chatId = args.chatId!;
        this.userId = args.userId!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3811523959, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatParticipantDelete {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _version = reader.readInt();
        args.version = _version;
        return new UpdateChatParticipantDelete(args);
    }
}