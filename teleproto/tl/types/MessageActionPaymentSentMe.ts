import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePaymentRequestedInfo } from "./TypePaymentRequestedInfo";
import { TypePaymentCharge } from "./TypePaymentCharge";

export class MessageActionPaymentSentMe extends TLObject {
    static CONSTRUCTOR_ID = 4288679116;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPaymentSentMe";
    static classType = "constructor";

    flags!: number;
    recurringInit?: boolean;
    recurringUsed?: boolean;
    currency!: string;
    totalAmount!: bigint;
    payload!: Buffer;
    info?: TypePaymentRequestedInfo;
    shippingOptionId?: string;
    charge!: TypePaymentCharge;
    subscriptionUntilDate?: number;

    constructor(args: { flags?: number, recurringInit?: boolean, recurringUsed?: boolean, currency?: string, totalAmount?: bigint, payload?: Buffer, info?: TypePaymentRequestedInfo, shippingOptionId?: string, charge?: TypePaymentCharge, subscriptionUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.recurringInit = args.recurringInit;
        this.recurringUsed = args.recurringUsed;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.payload = args.payload!;
        this.info = args.info;
        this.shippingOptionId = args.shippingOptionId;
        this.charge = args.charge!;
        this.subscriptionUntilDate = args.subscriptionUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4288679116, false);
        let flags = 0;
        if (this.recurringInit) { flags |= 1 << 2; }
        if (this.recurringUsed) { flags |= 1 << 3; }
        if (this.info !== undefined && this.info !== null) { flags |= 1 << 0; }
        if (this.shippingOptionId !== undefined && this.shippingOptionId !== null) { flags |= 1 << 1; }
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.recurringInit !== undefined && this.recurringInit !== null) {
        }
        if (this.recurringUsed !== undefined && this.recurringUsed !== null) {
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        writer.tgWriteBytes(this.payload);
        if (this.info !== undefined && this.info !== null) {
            writer.write(this.info.getBytes());
        }
        if (this.shippingOptionId !== undefined && this.shippingOptionId !== null) {
            writer.tgWriteString(this.shippingOptionId);
        }
        writer.write(this.charge.getBytes());
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) {
            writer.writeInt(this.subscriptionUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPaymentSentMe {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _recurringInit = true;
            args.recurringInit = _recurringInit;
        } else {
            args.recurringInit = false;
        }
        if (args.flags & (1 << 3)) {
            const _recurringUsed = true;
            args.recurringUsed = _recurringUsed;
        } else {
            args.recurringUsed = false;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
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
        const _charge = reader.tgReadObject();
        args.charge = _charge;
        if (args.flags & (1 << 4)) {
            const _subscriptionUntilDate = reader.readInt();
            args.subscriptionUntilDate = _subscriptionUntilDate;
        } else {
            args.subscriptionUntilDate = undefined;
        }
        return new MessageActionPaymentSentMe(args);
    }
}