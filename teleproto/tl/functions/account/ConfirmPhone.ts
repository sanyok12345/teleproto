import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ConfirmPhone extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1596029123;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ConfirmPhone";
    static classType = "request";

    phoneCodeHash?: string;
    phoneCode!: string;

    constructor(args: { phoneCodeHash?: string, phoneCode?: string } = {}) {
        super();
        this.phoneCodeHash = args.phoneCodeHash;
        this.phoneCode = args.phoneCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1596029123, false);
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

    static fromReader(reader: BinaryReader): ConfirmPhone {
        const args: any = {};
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _phoneCode = reader.tgReadString();
        args.phoneCode = _phoneCode;
        return new ConfirmPhone(args);
    }
}