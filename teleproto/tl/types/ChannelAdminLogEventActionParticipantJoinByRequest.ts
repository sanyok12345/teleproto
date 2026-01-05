import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class ChannelAdminLogEventActionParticipantJoinByRequest extends TLObject {
    static CONSTRUCTOR_ID = 2947945546;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantJoinByRequest";
    static classType = "constructor";

    invite!: TypeExportedChatInvite;
    approvedBy!: bigint;

    constructor(args: { invite?: TypeExportedChatInvite, approvedBy?: bigint } = {}) {
        super();
        this.invite = args.invite!;
        this.approvedBy = args.approvedBy!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2947945546, false);
        writer.write(this.invite.getBytes());
        writer.writeLargeInt(this.approvedBy, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantJoinByRequest {
        const args: any = {};
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        const _approvedBy = reader.readLargeInt(64);
        args.approvedBy = _approvedBy;
        return new ChannelAdminLogEventActionParticipantJoinByRequest(args);
    }
}