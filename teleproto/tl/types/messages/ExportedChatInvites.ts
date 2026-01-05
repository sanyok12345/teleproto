import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeExportedChatInvite } from "../TypeExportedChatInvite";
import { TypeUser } from "../TypeUser";

export class ExportedChatInvites extends TLObject {
    static CONSTRUCTOR_ID = 3183881676;
    static SUBCLASS_OF_ID = 1614624881;
    static className = "messages.ExportedChatInvites";
    static classType = "constructor";

    count!: number;
    invites!: TypeExportedChatInvite[];
    users!: TypeUser[];

    constructor(args: { count?: number, invites?: TypeExportedChatInvite[], users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.invites = args.invites!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3183881676, false);
        writer.writeInt(this.count);
        writer.writeVector(this.invites, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedChatInvites {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _invites = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.invites = _invites;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ExportedChatInvites(args);
    }
}