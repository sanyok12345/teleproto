import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class UpdateBotChatInviteRequester extends TLObject {
    static CONSTRUCTOR_ID = 299870598;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotChatInviteRequester";
    static classType = "constructor";

    peer!: TypePeer;
    date!: number;
    userId!: bigint;
    about!: string;
    invite!: TypeExportedChatInvite;
    qts!: number;

    constructor(args: { peer?: TypePeer, date?: number, userId?: bigint, about?: string, invite?: TypeExportedChatInvite, qts?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.date = args.date!;
        this.userId = args.userId!;
        this.about = args.about!;
        this.invite = args.invite!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(299870598, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.date);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.about);
        writer.write(this.invite.getBytes());
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotChatInviteRequester {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _date = reader.readInt();
        args.date = _date;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _about = reader.tgReadString();
        args.about = _about;
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotChatInviteRequester(args);
    }
}