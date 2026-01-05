import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class SignUp extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2865215255;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.SignUp";
    static classType = "request";

    flags?: number;
    noJoinedNotifications?: boolean;
    phoneNumber?: string;
    phoneCodeHash?: string;
    firstName!: string;
    lastName?: string;

    constructor(args: { flags?: number, noJoinedNotifications?: boolean, phoneNumber?: string, phoneCodeHash?: string, firstName?: string, lastName?: string } = {}) {
        super();
        this.flags = args.flags;
        this.noJoinedNotifications = args.noJoinedNotifications;
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.firstName = args.firstName!;
        this.lastName = args.lastName;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2865215255, false);
        let flags = 0;
        if (this.noJoinedNotifications) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.noJoinedNotifications !== undefined && this.noJoinedNotifications !== null) {
        }
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        writer.tgWriteString(this.firstName);
        writer.tgWriteString(this.lastName!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SignUp {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _noJoinedNotifications = true;
            args.noJoinedNotifications = _noJoinedNotifications;
        } else {
            args.noJoinedNotifications = false;
        }
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _firstName = reader.tgReadString();
        args.firstName = _firstName;
        const _lastName = reader.tgReadString();
        args.lastName = _lastName;
        return new SignUp(args);
    }
}