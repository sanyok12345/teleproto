import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeContact } from "../TypeContact";
import { TypeUser } from "../TypeUser";

export class Contacts extends TLObject {
    static CONSTRUCTOR_ID = 3941105218;
    static SUBCLASS_OF_ID = 951985654;
    static className = "contacts.Contacts";
    static classType = "constructor";

    contacts!: TypeContact[];
    savedCount!: number;
    users!: TypeUser[];

    constructor(args: { contacts?: TypeContact[], savedCount?: number, users?: TypeUser[] } = {}) {
        super();
        this.contacts = args.contacts!;
        this.savedCount = args.savedCount!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3941105218, false);
        writer.writeVector(this.contacts, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.savedCount);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Contacts {
        const args: any = {};
        const _contacts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.contacts = _contacts;
        const _savedCount = reader.readInt();
        args.savedCount = _savedCount;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new Contacts(args);
    }
}