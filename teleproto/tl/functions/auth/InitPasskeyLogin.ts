import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePasskeyLoginOptions } from "../../types/auth/TypePasskeyLoginOptions";

export class InitPasskeyLogin extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1368051895;
    static SUBCLASS_OF_ID = 3648598066;
    static className = "auth.InitPasskeyLogin";
    static classType = "request";

    apiId!: number;
    apiHash!: string;

    constructor(args: { apiId?: number, apiHash?: string } = {}) {
        super();
        this.apiId = args.apiId!;
        this.apiHash = args.apiHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1368051895, false);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.apiHash);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePasskeyLoginOptions {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InitPasskeyLogin {
        const args: any = {};
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _apiHash = reader.tgReadString();
        args.apiHash = _apiHash;
        return new InitPasskeyLogin(args);
    }
}