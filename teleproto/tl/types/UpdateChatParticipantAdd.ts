import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChatParticipantAdd extends TLObject {
    static CONSTRUCTOR_ID = 1037718609;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatParticipantAdd";
    static classType = "constructor";

    chatId!: bigint;
    userId!: bigint;
    inviterId!: bigint;
    date!: number;
    version!: number;

    constructor(args: { chatId?: bigint, userId?: bigint, inviterId?: bigint, date?: number, version?: number } = {}) {
        super();
        this.chatId = args.chatId!;
        this.userId = args.userId!;
        this.inviterId = args.inviterId!;
        this.date = args.date!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1037718609, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.writeLargeInt(this.inviterId, 64);
        writer.writeInt(this.date);
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatParticipantAdd {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _inviterId = reader.readLargeInt(64);
        args.inviterId = _inviterId;
        const _date = reader.readInt();
        args.date = _date;
        const _version = reader.readInt();
        args.version = _version;
        return new UpdateChatParticipantAdd(args);
    }
}