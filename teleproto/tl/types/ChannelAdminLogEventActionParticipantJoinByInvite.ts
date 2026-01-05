import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class ChannelAdminLogEventActionParticipantJoinByInvite extends TLObject {
    static CONSTRUCTOR_ID = 4271882584;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantJoinByInvite";
    static classType = "constructor";

    flags!: number;
    viaChatlist?: boolean;
    invite!: TypeExportedChatInvite;

    constructor(args: { flags?: number, viaChatlist?: boolean, invite?: TypeExportedChatInvite } = {}) {
        super();
        this.flags = args.flags!;
        this.viaChatlist = args.viaChatlist;
        this.invite = args.invite!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4271882584, false);
        let flags = 0;
        if (this.viaChatlist) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.viaChatlist !== undefined && this.viaChatlist !== null) {
        }
        writer.write(this.invite.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantJoinByInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _viaChatlist = true;
            args.viaChatlist = _viaChatlist;
        } else {
            args.viaChatlist = false;
        }
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        return new ChannelAdminLogEventActionParticipantJoinByInvite(args);
    }
}