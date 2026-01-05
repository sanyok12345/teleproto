import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBirthday } from "./TypeBirthday";

export class ContactBirthday extends TLObject {
    static CONSTRUCTOR_ID = 496600883;
    static SUBCLASS_OF_ID = 3638372358;
    static className = "ContactBirthday";
    static classType = "constructor";

    contactId!: bigint;
    birthday!: TypeBirthday;

    constructor(args: { contactId?: bigint, birthday?: TypeBirthday } = {}) {
        super();
        this.contactId = args.contactId!;
        this.birthday = args.birthday!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(496600883, false);
        writer.writeLargeInt(this.contactId, 64);
        writer.write(this.birthday.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ContactBirthday {
        const args: any = {};
        const _contactId = reader.readLargeInt(64);
        args.contactId = _contactId;
        const _birthday = reader.tgReadObject();
        args.birthday = _birthday;
        return new ContactBirthday(args);
    }
}