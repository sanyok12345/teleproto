import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeExportedChatInvite } from "../TypeExportedChatInvite";
import { TypeUser } from "../TypeUser";

export class ExportedChatInvite extends TLObject {
    static CONSTRUCTOR_ID = 410107472;
    static SUBCLASS_OF_ID = 2195510474;
    static className = "messages.ExportedChatInvite";
    static classType = "constructor";

    invite!: TypeExportedChatInvite;
    users!: TypeUser[];

    constructor(args: { invite?: TypeExportedChatInvite, users?: TypeUser[] } = {}) {
        super();
        this.invite = args.invite!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(410107472, false);
        writer.write(this.invite.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedChatInvite {
        const args: any = {};
        const _invite = reader.tgReadObject();
        args.invite = _invite;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ExportedChatInvite(args);
    }
}