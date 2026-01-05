import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SavedPhoneContact extends TLObject {
    static CONSTRUCTOR_ID = 289586518;
    static SUBCLASS_OF_ID = 115054788;
    static className = "SavedPhoneContact";
    static classType = "constructor";

    phone!: string;
    firstName!: string;
    lastName!: string;
    date!: number;

    constructor(args: { phone?: string, firstName?: string, lastName?: string, date?: number } = {}) {
        super();
        this.phone = args.phone!;
        this.firstName = args.firstName!;
        this.lastName = args.lastName!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(289586518, false);
        writer.tgWriteString(this.phone);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedPhoneContact {
        const args: any = {};
        const _phone = reader.tgReadString();
        args.phone = _phone;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        const _date = reader.readInt();
        args.date = _date;
        return new SavedPhoneContact(args);
    }
}