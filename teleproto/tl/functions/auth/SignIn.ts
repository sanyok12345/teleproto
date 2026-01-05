import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmailVerification } from "../../types/TypeEmailVerification";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class SignIn extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2371004753;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.SignIn";
    static classType = "request";

    flags?: number;
    phoneNumber?: string;
    phoneCodeHash?: string;
    phoneCode?: string;
    emailVerification?: TypeEmailVerification;

    constructor(args: { flags?: number, phoneNumber?: string, phoneCodeHash?: string, phoneCode?: string, emailVerification?: TypeEmailVerification } = {}) {
        super();
        this.flags = args.flags;
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.phoneCode = args.phoneCode;
        this.emailVerification = args.emailVerification;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2371004753, false);
        let flags = 0;
        if (this.phoneCode !== undefined && this.phoneCode !== null) { flags |= 1 << 0; }
        if (this.emailVerification !== undefined && this.emailVerification !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        if (this.phoneCode !== undefined && this.phoneCode !== null) {
            writer.tgWriteString(this.phoneCode);
        }
        if (this.emailVerification !== undefined && this.emailVerification !== null) {
            writer.write(this.emailVerification.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SignIn {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        if (args.flags & (1 << 0)) {
            const _phoneCode = reader.tgReadString();
            args.phoneCode = _phoneCode;
        } else {
            args.phoneCode = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _emailVerification = reader.tgReadObject();
            args.emailVerification = _emailVerification;
        } else {
            args.emailVerification = undefined;
        }
        return new SignIn(args);
    }
}