import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChatParticipantAdmin extends TLObject {
    static CONSTRUCTOR_ID = 3620364706;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatParticipantAdmin";
    static classType = "constructor";

    chatId!: bigint;
    userId!: bigint;
    isAdmin!: boolean;
    version!: number;

    constructor(args: { chatId?: bigint, userId?: bigint, isAdmin?: boolean, version?: number } = {}) {
        super();
        this.chatId = args.chatId!;
        this.userId = args.userId!;
        this.isAdmin = args.isAdmin!;
        this.version = args.version!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3620364706, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteBool(this.isAdmin);
        writer.writeInt(this.version);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatParticipantAdmin {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _isAdmin = reader.tgReadBool();
        args.isAdmin = _isAdmin;
        const _version = reader.readInt();
        args.version = _version;
        return new UpdateChatParticipantAdmin(args);
    }
}