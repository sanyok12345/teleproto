import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSecureValueHash } from "../../types/TypeSecureValueHash";
import { TypeSecureCredentialsEncrypted } from "../../types/TypeSecureCredentialsEncrypted";

export class AcceptAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4092415091;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.AcceptAuthorization";
    static classType = "request";

    botId!: bigint;
    scope!: string;
    publicKey!: string;
    valueHashes!: TypeSecureValueHash[];
    credentials!: TypeSecureCredentialsEncrypted;

    constructor(args: { botId?: bigint, scope?: string, publicKey?: string, valueHashes?: TypeSecureValueHash[], credentials?: TypeSecureCredentialsEncrypted } = {}) {
        super();
        this.botId = args.botId!;
        this.scope = args.scope!;
        this.publicKey = args.publicKey!;
        this.valueHashes = args.valueHashes!;
        this.credentials = args.credentials!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4092415091, false);
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.scope);
        writer.tgWriteString(this.publicKey);
        writer.writeVector(this.valueHashes, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.credentials.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AcceptAuthorization {
        const args: any = {};
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _scope = reader.tgReadString();
        args.scope = _scope;
        const _publicKey = reader.tgReadString();
        args.publicKey = _publicKey;
        const _valueHashes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.valueHashes = _valueHashes;
        const _credentials = reader.tgReadObject();
        args.credentials = _credentials;
        return new AcceptAuthorization(args);
    }
}