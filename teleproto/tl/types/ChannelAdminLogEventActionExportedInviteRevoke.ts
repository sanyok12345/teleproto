import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class ChannelAdminLogEventActionExportedInviteRevoke extends TLObject {
    static CONSTRUCTOR_ID = 1091179342;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionExportedInviteRevoke";
    static classType = "constructor";

    invite!: TypeExportedChatInvite;

    constructor(args: { invite?: TypeExportedChatInvite } = {}) {
        super();
        this.invite = args.invite!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1091179342, false);
        writer.write(this.invite.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionExportedInviteRevoke {
        const args: any = {};
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        return new ChannelAdminLogEventActionExportedInviteRevoke(args);
    }
}