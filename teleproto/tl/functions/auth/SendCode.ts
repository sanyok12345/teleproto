import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCodeSettings } from "../../types/TypeCodeSettings";
import { TypeSentCode } from "../../types/auth/TypeSentCode";

export class SendCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2792825935;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.SendCode";
    static classType = "request";

    phoneNumber?: string;
    apiId!: number;
    apiHash!: string;
    settings!: TypeCodeSettings;

    constructor(args: { phoneNumber?: string, apiId?: number, apiHash?: string, settings?: TypeCodeSettings } = {}) {
        super();
        this.phoneNumber = args.phoneNumber;
        this.apiId = args.apiId!;
        this.apiHash = args.apiHash!;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2792825935, false);
        writer.tgWriteString(this.phoneNumber!);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.apiHash);
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendCode {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _apiHash = reader.tgReadString();
        args.apiHash = _apiHash;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SendCode(args);
    }
}