import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class GetBotBusinessConnection extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1990746736;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "account.GetBotBusinessConnection";
    static classType = "request";

    connectionId!: string;

    constructor(args: { connectionId?: string } = {}) {
        super();
        this.connectionId = args.connectionId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1990746736, false);
        writer.tgWriteString(this.connectionId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotBusinessConnection {
        const args: any = {};
        const _connectionId = reader.tgReadString();
        args.connectionId = _connectionId;
        return new GetBotBusinessConnection(args);
    }
}