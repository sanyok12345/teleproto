import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class ImportBotAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1738800940;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.ImportBotAuthorization";
    static classType = "request";

    flags?: number;
    apiId!: number;
    apiHash!: string;
    botAuthToken!: string;

    constructor(args: { flags?: number, apiId?: number, apiHash?: string, botAuthToken?: string } = {}) {
        super();
        this.flags = args.flags;
        this.apiId = args.apiId!;
        this.apiHash = args.apiHash!;
        this.botAuthToken = args.botAuthToken!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1738800940, false);
        writer.writeInt(this.flags!);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.apiHash);
        writer.tgWriteString(this.botAuthToken);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportBotAuthorization {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _apiHash = reader.tgReadString();
        args.apiHash = _apiHash;
        const _botAuthToken = reader.tgReadString();
        args.botAuthToken = _botAuthToken;
        return new ImportBotAuthorization(args);
    }
}