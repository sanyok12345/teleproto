import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class ImportWebTokenAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 767062953;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.ImportWebTokenAuthorization";
    static classType = "request";

    apiId!: number;
    apiHash!: string;
    webAuthToken!: string;

    constructor(args: { apiId?: number, apiHash?: string, webAuthToken?: string } = {}) {
        super();
        this.apiId = args.apiId!;
        this.apiHash = args.apiHash!;
        this.webAuthToken = args.webAuthToken!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(767062953, false);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.apiHash);
        writer.tgWriteString(this.webAuthToken);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportWebTokenAuthorization {
        const args: any = {};
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _apiHash = reader.tgReadString();
        args.apiHash = _apiHash;
        const _webAuthToken = reader.tgReadString();
        args.webAuthToken = _webAuthToken;
        return new ImportWebTokenAuthorization(args);
    }
}