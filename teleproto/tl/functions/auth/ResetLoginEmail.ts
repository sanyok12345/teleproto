import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSentCode } from "../../types/auth/TypeSentCode";

export class ResetLoginEmail extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2123760019;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.ResetLoginEmail";
    static classType = "request";

    phoneNumber?: string;
    phoneCodeHash?: string;

    constructor(args: { phoneNumber?: string, phoneCodeHash?: string } = {}) {
        super();
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2123760019, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResetLoginEmail {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        return new ResetLoginEmail(args);
    }
}