import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUser } from "../../types/TypeUser";

export class ChangePhone extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1891839707;
    static SUBCLASS_OF_ID = 765557111;
    static className = "account.ChangePhone";
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
        writer.writeInt(1891839707, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.tgWriteString(this.phoneCodeHash!);
        writer.tgWriteString(this.phoneCode);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ChangePhone {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _phoneCode = reader.tgReadString();
        args.phoneCode = _phoneCode;
        return new ChangePhone(args);
    }
}