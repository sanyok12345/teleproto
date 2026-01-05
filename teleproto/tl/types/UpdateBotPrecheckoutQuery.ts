import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePaymentRequestedInfo } from "./TypePaymentRequestedInfo";

export class UpdateBotPrecheckoutQuery extends TLObject {
    static CONSTRUCTOR_ID = 2359990934;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotPrecheckoutQuery";
    static classType = "constructor";

    flags!: number;
    queryId!: bigint;
    userId!: bigint;
    payload!: Buffer;
    info?: TypePaymentRequestedInfo;
    shippingOptionId?: string;
    currency!: string;
    totalAmount!: bigint;

    constructor(args: { flags?: number, queryId?: bigint, userId?: bigint, payload?: Buffer, info?: TypePaymentRequestedInfo, shippingOptionId?: string, currency?: string, totalAmount?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.queryId = args.queryId!;
        this.userId = args.userId!;
        this.payload = args.payload!;
        this.info = args.info;
        this.shippingOptionId = args.shippingOptionId;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2359990934, false);
        let flags = 0;
        if (this.info !== undefined && this.info !== null) { flags |= 1 << 0; }
        if (this.shippingOptionId !== undefined && this.shippingOptionId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteBytes(this.payload);
        if (this.info !== undefined && this.info !== null) {
            writer.write(this.info.getBytes());
        }
        if (this.shippingOptionId !== undefined && this.shippingOptionId !== null) {
            writer.tgWriteString(this.shippingOptionId);
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotPrecheckoutQuery {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _payload = reader.tgReadBytes();
        args.payload = _payload;
        if (args.flags & (1 << 0)) {
            const _info = reader.tgReadObject();
            args.info = _info;
        } else {
            args.info = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _shippingOptionId = reader.tgReadString();
            args.shippingOptionId = _shippingOptionId;
        } else {
            args.shippingOptionId = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
        return new UpdateBotPrecheckoutQuery(args);
    }
}