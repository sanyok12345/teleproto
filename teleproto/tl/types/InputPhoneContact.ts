import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class InputPhoneContact extends TLObject {
    static CONSTRUCTOR_ID = 1780335806;
    static SUBCLASS_OF_ID = 2926144130;
    static className = "InputPhoneContact";
    static classType = "constructor";

    flags!: number;
    clientId!: bigint;
    phone!: string;
    firstName!: string;
    lastName!: string;
    note?: TypeTextWithEntities;

    constructor(args: { flags?: number, clientId?: bigint, phone?: string, firstName?: string, lastName?: string, note?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.clientId = args.clientId!;
        this.phone = args.phone!;
        this.firstName = args.firstName!;
        this.lastName = args.lastName!;
        this.note = args.note;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1780335806, false);
        let flags = 0;
        if (this.note !== undefined && this.note !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.clientId, 64);
        writer.tgWriteString(this.phone);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName);
        if (this.note !== undefined && this.note !== null) {
            writer.write(this.note.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPhoneContact {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _clientId = reader.readLargeInt(64);
        args.clientId = _clientId;
        const _phone = reader.tgReadString();
        args.phone = _phone;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        if (args.flags & (1 << 0)) {
            const _note = reader.tgReadObject();
            args.note = _note;
        } else {
            args.note = undefined;
        }
        return new InputPhoneContact(args);
    }
}