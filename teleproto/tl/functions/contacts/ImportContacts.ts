import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputContact } from "../../types/TypeInputContact";
import { TypeImportedContacts } from "../../types/contacts/TypeImportedContacts";

export class ImportContacts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 746589157;
    static SUBCLASS_OF_ID = 2171776403;
    static className = "contacts.ImportContacts";
    static classType = "request";

    contacts!: TypeInputContact[];

    constructor(args: { contacts?: TypeInputContact[] } = {}) {
        super();
        this.contacts = args.contacts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(746589157, false);
        writer.writeVector(this.contacts, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeImportedContacts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportContacts {
        const args: any = {};
        const _contacts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.contacts = _contacts;
        return new ImportContacts(args);
    }
}