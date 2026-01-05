import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeContactBirthday } from "../TypeContactBirthday";
import { TypeUser } from "../TypeUser";

export class ContactBirthdays extends TLObject {
    static CONSTRUCTOR_ID = 290452237;
    static SUBCLASS_OF_ID = 242920447;
    static className = "contacts.ContactBirthdays";
    static classType = "constructor";

    contacts!: TypeContactBirthday[];
    users!: TypeUser[];

    constructor(args: { contacts?: TypeContactBirthday[], users?: TypeUser[] } = {}) {
        super();
        this.contacts = args.contacts!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(290452237, false);
        writer.writeVector(this.contacts, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ContactBirthdays {
        const args: any = {};
        const _contacts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.contacts = _contacts;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ContactBirthdays(args);
    }
}