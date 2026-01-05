import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatParticipant } from "./TypeChatParticipant";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class UpdateChatParticipant extends TLObject {
    static CONSTRUCTOR_ID = 3498534458;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChatParticipant";
    static classType = "constructor";

    flags!: number;
    chatId!: bigint;
    date!: number;
    actorId!: bigint;
    userId!: bigint;
    prevParticipant?: TypeChatParticipant;
    newParticipant?: TypeChatParticipant;
    invite?: TypeExportedChatInvite;
    qts!: number;

    constructor(args: { flags?: number, chatId?: bigint, date?: number, actorId?: bigint, userId?: bigint, prevParticipant?: TypeChatParticipant, newParticipant?: TypeChatParticipant, invite?: TypeExportedChatInvite, qts?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.chatId = args.chatId!;
        this.date = args.date!;
        this.actorId = args.actorId!;
        this.userId = args.userId!;
        this.prevParticipant = args.prevParticipant;
        this.newParticipant = args.newParticipant;
        this.invite = args.invite;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3498534458, false);
        let flags = 0;
        if (this.prevParticipant !== undefined && this.prevParticipant !== null) { flags |= 1 << 0; }
        if (this.newParticipant !== undefined && this.newParticipant !== null) { flags |= 1 << 1; }
        if (this.invite !== undefined && this.invite !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.actorId, 64);
        writer.writeLargeInt(this.userId, 64);
        if (this.prevParticipant !== undefined && this.prevParticipant !== null) {
            writer.write(this.prevParticipant.getBytes());
        }
        if (this.newParticipant !== undefined && this.newParticipant !== null) {
            writer.write(this.newParticipant.getBytes());
        }
        if (this.invite !== undefined && this.invite !== null) {
            writer.write(this.invite.getBytes());
        }
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChatParticipant {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _date = reader.readInt();
        args.date = _date;
        const _actorId = reader.readLargeInt(64);
        args.actorId = _actorId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        if (args.flags & (1 << 0)) {
            const _prevParticipant = reader.tgReadObject();
            args.prevParticipant = _prevParticipant;
        } else {
            args.prevParticipant = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _newParticipant = reader.tgReadObject();
            args.newParticipant = _newParticipant;
        } else {
            args.newParticipant = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _invite = reader.tgReadObject();
            args.invite = _invite;
        } else {
            args.invite = undefined;
        }
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateChatParticipant(args);
    }
}