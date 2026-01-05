import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeImportedContact } from "../TypeImportedContact";
import { TypePopularContact } from "../TypePopularContact";
import { TypeUser } from "../TypeUser";

export class ImportedContacts extends TLObject {
    static CONSTRUCTOR_ID = 2010127419;
    static SUBCLASS_OF_ID = 2171776403;
    static className = "contacts.ImportedContacts";
    static classType = "constructor";

    imported!: TypeImportedContact[];
    popularInvites!: TypePopularContact[];
    retryContacts!: bigint[];
    users!: TypeUser[];

    constructor(args: { imported?: TypeImportedContact[], popularInvites?: TypePopularContact[], retryContacts?: bigint[], users?: TypeUser[] } = {}) {
        super();
        this.imported = args.imported!;
        this.popularInvites = args.popularInvites!;
        this.retryContacts = args.retryContacts!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2010127419, false);
        writer.writeVector(this.imported, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.popularInvites, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.retryContacts, (item) => {
            writer.writeLargeInt(item, 64);
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ImportedContacts {
        const args: any = {};
        const _imported = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.imported = _imported;
        const _popularInvites = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.popularInvites = _popularInvites;
        const _retryContacts = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.retryContacts = _retryContacts;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new ImportedContacts(args);
    }
}