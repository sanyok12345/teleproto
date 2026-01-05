import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChatInviteImporter } from "../TypeChatInviteImporter";
import { TypeUser } from "../TypeUser";

export class ChatInviteImporters extends TLObject {
    static CONSTRUCTOR_ID = 2176233482;
    static SUBCLASS_OF_ID = 3653012134;
    static className = "messages.ChatInviteImporters";
    static classType = "constructor";

    count!: number;
    importers!: TypeChatInviteImporter[];
    users!: TypeUser[];

    constructor(args: { count?: number, importers?: TypeChatInviteImporter[], users?: TypeUser[] } = {}) {
        super();
        this.count = args.count!;
        this.importers = args.importers!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2176233482, false);
        writer.writeInt(this.count);
        writer.writeVector(this.importers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatInviteImporters {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _importers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.importers = _importers;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ChatInviteImporters(args);
    }
}