import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSentCode } from "../../types/auth/TypeSentCode";

export class CheckPaidAuth extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1457889180;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.CheckPaidAuth";
    static classType = "request";

    phoneNumber?: string;
    phoneCodeHash?: string;
    formId!: bigint;

    constructor(args: { phoneNumber?: string, phoneCodeHash?: string, formId?: bigint } = {}) {
        super();
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.formId = args.formId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1457889180, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        writer.writeLargeInt(this.formId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckPaidAuth {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _formId = reader.readLargeInt(64);
        args.formId = _formId;
        return new CheckPaidAuth(args);
    }
}