import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionPaymentSent extends TLObject {
    static CONSTRUCTOR_ID = 3324293486;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPaymentSent";
    static classType = "constructor";

    flags!: number;
    recurringInit?: boolean;
    recurringUsed?: boolean;
    currency!: string;
    totalAmount!: bigint;
    invoiceSlug?: string;
    subscriptionUntilDate?: number;

    constructor(args: { flags?: number, recurringInit?: boolean, recurringUsed?: boolean, currency?: string, totalAmount?: bigint, invoiceSlug?: string, subscriptionUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.recurringInit = args.recurringInit;
        this.recurringUsed = args.recurringUsed;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.invoiceSlug = args.invoiceSlug;
        this.subscriptionUntilDate = args.subscriptionUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3324293486, false);
        let flags = 0;
        if (this.recurringInit) { flags |= 1 << 2; }
        if (this.recurringUsed) { flags |= 1 << 3; }
        if (this.invoiceSlug !== undefined && this.invoiceSlug !== null) { flags |= 1 << 0; }
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.recurringInit !== undefined && this.recurringInit !== null) {
        }
        if (this.recurringUsed !== undefined && this.recurringUsed !== null) {
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        if (this.invoiceSlug !== undefined && this.invoiceSlug !== null) {
            writer.tgWriteString(this.invoiceSlug);
        }
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) {
            writer.writeInt(this.subscriptionUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPaymentSent {
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
        if (args.flags & (1 << 0)) {
            const _invoiceSlug = reader.tgReadString();
            args.invoiceSlug = _invoiceSlug;
        } else {
            args.invoiceSlug = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _subscriptionUntilDate = reader.readInt();
            args.subscriptionUntilDate = _subscriptionUntilDate;
        } else {
            args.subscriptionUntilDate = undefined;
        }
        return new MessageActionPaymentSent(args);
    }
}