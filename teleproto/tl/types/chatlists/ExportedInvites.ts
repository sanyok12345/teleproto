import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeExportedChatlistInvite } from "../TypeExportedChatlistInvite";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ExportedInvites extends TLObject {
    static CONSTRUCTOR_ID = 279670215;
    static SUBCLASS_OF_ID = 3871476160;
    static className = "chatlists.ExportedInvites";
    static classType = "constructor";

    invites!: TypeExportedChatlistInvite[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { invites?: TypeExportedChatlistInvite[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.invites = args.invites!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(279670215, false);
        writer.writeVector(this.invites, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedInvites {
        const args: any = {};
        const _invites = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.invites = _invites;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ExportedInvites(args);
    }
}