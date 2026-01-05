import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeTextWithEntities } from "../../types/TypeTextWithEntities";
import { TypeUpdates } from "../../types/TypeUpdates";

export class AddContact extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3652857428;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "contacts.AddContact";
    static classType = "request";

    flags?: number;
    addPhonePrivacyException?: boolean;
    id?: EntityLike;
    firstName!: string;
    lastName?: string;
    phone!: string;
    note?: TypeTextWithEntities;

    constructor(args: { flags?: number, addPhonePrivacyException?: boolean, id?: EntityLike, firstName?: string, lastName?: string, phone?: string, note?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags;
        this.addPhonePrivacyException = args.addPhonePrivacyException;
        this.id = args.id;
        this.firstName = args.firstName!;
        this.lastName = args.lastName;
        this.phone = args.phone!;
        this.note = args.note;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3652857428, false);
        let flags = 0;
        if (this.addPhonePrivacyException) { flags |= 1 << 0; }
        if (this.note !== undefined && this.note !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.addPhonePrivacyException !== undefined && this.addPhonePrivacyException !== null) {
        }
        writer.write((this.id! as any).getBytes());
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName!);
        writer.tgWriteString(this.phone);
        if (this.note !== undefined && this.note !== null) {
            writer.write(this.note.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AddContact {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _addPhonePrivacyException = true;
            args.addPhonePrivacyException = _addPhonePrivacyException;
        } else {
            args.addPhonePrivacyException = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        const _phone = reader.tgReadString();
        args.phone = _phone;
        if (args.flags & (1 << 1)) {
            const _note = reader.tgReadObject();
            args.note = _note;
        } else {
            args.note = undefined;
        }
        return new AddContact(args);
    }
}