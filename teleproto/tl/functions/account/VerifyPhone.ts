import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class VerifyPhone extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1305716726;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.VerifyPhone";
    static classType = "request";

    phoneNumber?: string;
    phoneCodeHash?: string;
    phoneCode!: string;

    constructor(args: { phoneNumber?: string, phoneCodeHash?: string, phoneCode?: string } = {}) {
        super();
        this.phoneNumber = args.phoneNumber;
        this.phoneCodeHash = args.phoneCodeHash;
        this.phoneCode = args.phoneCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1305716726, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        writer.tgWriteString(this.phoneCode);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): VerifyPhone {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _phoneCode = reader.tgReadString();
        args.phoneCode = _phoneCode;
        return new VerifyPhone(args);
    }
}