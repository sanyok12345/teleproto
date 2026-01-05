import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageMediaContact extends TLObject {
    static CONSTRUCTOR_ID = 1882335561;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaContact";
    static classType = "constructor";

    phoneNumber!: string;
    firstName!: string;
    lastName!: string;
    vcard!: string;
    userId!: bigint;

    constructor(args: { phoneNumber?: string, firstName?: string, lastName?: string, vcard?: string, userId?: bigint } = {}) {
        super();
        this.phoneNumber = args.phoneNumber!;
        this.firstName = args.firstName!;
        this.lastName = args.lastName!;
        this.vcard = args.vcard!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1882335561, false);
        writer.tgWriteString(this.phoneNumber);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName);
        writer.tgWriteString(this.vcard);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaContact {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        const _vcard = reader.tgReadString();
        args.vcard = _vcard;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new MessageMediaContact(args);
    }
}