import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class UpdateBotWebhookJSONQuery extends TLObject {
    static CONSTRUCTOR_ID = 2610053286;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotWebhookJSONQuery";
    static classType = "constructor";

    queryId!: bigint;
    data!: TypeDataJSON;
    timeout!: number;

    constructor(args: { queryId?: bigint, data?: TypeDataJSON, timeout?: number } = {}) {
        super();
        this.queryId = args.queryId!;
        this.data = args.data!;
        this.timeout = args.timeout!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2610053286, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.write(this.data.getBytes());
        writer.writeInt(this.timeout);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotWebhookJSONQuery {
        const args: any = {};
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _data = reader.tgReadObject();
        args.data = _data;
        const _timeout = reader.readInt();
        args.timeout = _timeout;
        return new UpdateBotWebhookJSONQuery(args);
    }
}