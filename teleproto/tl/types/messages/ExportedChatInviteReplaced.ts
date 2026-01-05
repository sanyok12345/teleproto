import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeExportedChatInvite } from "../TypeExportedChatInvite";
import { TypeUser } from "../TypeUser";

export class ExportedChatInviteReplaced extends TLObject {
    static CONSTRUCTOR_ID = 572915951;
    static SUBCLASS_OF_ID = 2195510474;
    static className = "messages.ExportedChatInviteReplaced";
    static classType = "constructor";

    invite!: TypeExportedChatInvite;
    newInvite!: TypeExportedChatInvite;
    users!: TypeUser[];

    constructor(args: { invite?: TypeExportedChatInvite, newInvite?: TypeExportedChatInvite, users?: TypeUser[] } = {}) {
        super();
        this.invite = args.invite!;
        this.newInvite = args.newInvite!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(572915951, false);
        writer.write(this.invite.getBytes());
        writer.write(this.newInvite.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedChatInviteReplaced {
        const args: any = {};
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        const _newInvite = reader.tgReadObject();
        args.newInvite = _newInvite;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ExportedChatInviteReplaced(args);
    }
}