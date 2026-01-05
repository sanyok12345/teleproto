import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSentCode } from "../../types/auth/TypeSentCode";

export class ResendCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3403969827;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.ResendCode";
    static classType = "request";

    flags?: number;
    phoneNumber?: string;
    phoneCodeHash?: string;
    reason?: string;

    constructor(args: { flags?: number, phoneNumber?: string, phoneCodeHash?: string, reason?: string } = {}) {
        super();
        this.flags = args.flags;
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.reason = args.reason;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3403969827, false);
        let flags = 0;
        if (this.reason !== undefined && this.reason !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        if (this.reason !== undefined && this.reason !== null) {
            writer.tgWriteString(this.reason);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResendCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        if (args.flags & (1 << 0)) {
            const _reason = reader.tgReadString();
            args.reason = _reason;
        } else {
            args.reason = undefined;
        }
        return new ResendCode(args);
    }
}