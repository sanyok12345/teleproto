import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePostAddress } from "./TypePostAddress";

export class UpdateBotShippingQuery extends TLObject {
    static CONSTRUCTOR_ID = 3048144253;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotShippingQuery";
    static classType = "constructor";

    queryId!: bigint;
    userId!: bigint;
    payload!: Buffer;
    shippingAddress!: TypePostAddress;

    constructor(args: { queryId?: bigint, userId?: bigint, payload?: Buffer, shippingAddress?: TypePostAddress } = {}) {
        super();
        this.queryId = args.queryId!;
        this.userId = args.userId!;
        this.payload = args.payload!;
        this.shippingAddress = args.shippingAddress!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3048144253, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteBytes(this.payload);
        writer.write(this.shippingAddress.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotShippingQuery {
        const args: any = {};
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _payload = reader.tgReadBytes();
        args.payload = _payload;
        const _shippingAddress = reader.tgReadObject();
        args.shippingAddress = _shippingAddress;
        return new UpdateBotShippingQuery(args);
    }
}