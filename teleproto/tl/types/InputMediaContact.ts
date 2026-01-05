import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMediaContact extends TLObject {
    static CONSTRUCTOR_ID = 4171988475;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaContact";
    static classType = "constructor";

    phoneNumber!: string;
    firstName!: string;
    lastName!: string;
    vcard!: string;

    constructor(args: { phoneNumber?: string, firstName?: string, lastName?: string, vcard?: string } = {}) {
        super();
        this.phoneNumber = args.phoneNumber!;
        this.firstName = args.firstName!;
        this.lastName = args.lastName!;
        this.vcard = args.vcard!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4171988475, false);
        writer.tgWriteString(this.phoneNumber);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName);
        writer.tgWriteString(this.vcard);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaContact {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        const _vcard = reader.tgReadString();
        args.vcard = _vcard;
        return new InputMediaContact(args);
    }
}