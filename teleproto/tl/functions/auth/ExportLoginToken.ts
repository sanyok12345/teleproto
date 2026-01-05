import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLoginToken } from "../../types/auth/TypeLoginToken";

export class ExportLoginToken extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3084944894;
    static SUBCLASS_OF_ID = 1800795702;
    static className = "auth.ExportLoginToken";
    static classType = "request";

    apiId!: number;
    apiHash!: string;
    exceptIds!: bigint[];

    constructor(args: { apiId?: number, apiHash?: string, exceptIds?: bigint[] } = {}) {
        super();
        this.apiId = args.apiId!;
        this.apiHash = args.apiHash!;
        this.exceptIds = args.exceptIds!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3084944894, false);
        writer.writeInt(this.apiId);
        writer.tgWriteString(this.apiHash);
        writer.writeVector(this.exceptIds, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLoginToken {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportLoginToken {
        const args: any = {};
        const _apiId = reader.readInt();
        args.apiId = _apiId;
        const _apiHash = reader.tgReadString();
        args.apiHash = _apiHash;
        const _exceptIds = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.exceptIds = _exceptIds;
        return new ExportLoginToken(args);
    }
}