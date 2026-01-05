import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDataJSON } from "../../types/TypeDataJSON";

export class AnswerWebhookJSONQuery extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3860938573;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.AnswerWebhookJSONQuery";
    static classType = "request";

    queryId?: bigint;
    data!: TypeDataJSON;

    constructor(args: { queryId?: bigint, data?: TypeDataJSON } = {}) {
        super();
        this.queryId = args.queryId;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3860938573, false);
        writer.writeLargeInt(this.queryId!, 64);
        writer.write(this.data.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AnswerWebhookJSONQuery {
        const args: any = {};
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _data = reader.tgReadObject();
        args.data = _data;
        return new AnswerWebhookJSONQuery(args);
    }
}