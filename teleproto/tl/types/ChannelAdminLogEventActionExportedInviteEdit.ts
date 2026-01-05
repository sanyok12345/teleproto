import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";

export class ChannelAdminLogEventActionExportedInviteEdit extends TLObject {
    static CONSTRUCTOR_ID = 3910056793;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionExportedInviteEdit";
    static classType = "constructor";

    prevInvite!: TypeExportedChatInvite;
    newInvite!: TypeExportedChatInvite;

    constructor(args: { prevInvite?: TypeExportedChatInvite, newInvite?: TypeExportedChatInvite } = {}) {
        super();
        this.prevInvite = args.prevInvite!;
        this.newInvite = args.newInvite!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3910056793, false);
        writer.write(this.prevInvite.getBytes());
        writer.write(this.newInvite.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionExportedInviteEdit {
        const args: any = {};
        const _prevInvite = reader.tgReadObject();
        args.prevInvite = _prevInvite;
        const _newInvite = reader.tgReadObject();
        args.newInvite = _newInvite;
        return new ChannelAdminLogEventActionExportedInviteEdit(args);
    }
}