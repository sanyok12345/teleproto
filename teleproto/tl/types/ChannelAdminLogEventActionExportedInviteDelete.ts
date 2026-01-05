import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class ChannelAdminLogEventActionExportedInviteDelete extends TLObject {
    static CONSTRUCTOR_ID = 1515256996;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionExportedInviteDelete";
    static classType = "constructor";

    invite!: TypeExportedChatInvite;

    constructor(args: { invite?: TypeExportedChatInvite } = {}) {
        super();
        this.invite = args.invite!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1515256996, false);
        writer.write(this.invite.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionExportedInviteDelete {
        const args: any = {};
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        return new ChannelAdminLogEventActionExportedInviteDelete(args);
    }
}