import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeLabeledPrice } from "./TypeLabeledPrice";

export class Invoice extends TLObject {
    static CONSTRUCTOR_ID = 77522308;
    static SUBCLASS_OF_ID = 1608003288;
    static className = "Invoice";
    static classType = "constructor";

    flags!: number;
    test?: boolean;
    nameRequested?: boolean;
    phoneRequested?: boolean;
    emailRequested?: boolean;
    shippingAddressRequested?: boolean;
    flexible?: boolean;
    phoneToProvider?: boolean;
    emailToProvider?: boolean;
    recurring?: boolean;
    currency!: string;
    prices!: TypeLabeledPrice[];
    maxTipAmount?: bigint;
    suggestedTipAmounts?: bigint[];
    termsUrl?: string;
    subscriptionPeriod?: number;

    constructor(args: { flags?: number, test?: boolean, nameRequested?: boolean, phoneRequested?: boolean, emailRequested?: boolean, shippingAddressRequested?: boolean, flexible?: boolean, phoneToProvider?: boolean, emailToProvider?: boolean, recurring?: boolean, currency?: string, prices?: TypeLabeledPrice[], maxTipAmount?: bigint, suggestedTipAmounts?: bigint[], termsUrl?: string, subscriptionPeriod?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.test = args.test;
        this.nameRequested = args.nameRequested;
        this.phoneRequested = args.phoneRequested;
        this.emailRequested = args.emailRequested;
        this.shippingAddressRequested = args.shippingAddressRequested;
        this.flexible = args.flexible;
        this.phoneToProvider = args.phoneToProvider;
        this.emailToProvider = args.emailToProvider;
        this.recurring = args.recurring;
        this.currency = args.currency!;
        this.prices = args.prices!;
        this.maxTipAmount = args.maxTipAmount;
        this.suggestedTipAmounts = args.suggestedTipAmounts;
        this.termsUrl = args.termsUrl;
        this.subscriptionPeriod = args.subscriptionPeriod;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(77522308, false);
        let flags = 0;
        if (this.test) { flags |= 1 << 0; }
        if (this.nameRequested) { flags |= 1 << 1; }
        if (this.phoneRequested) { flags |= 1 << 2; }
        if (this.emailRequested) { flags |= 1 << 3; }
        if (this.shippingAddressRequested) { flags |= 1 << 4; }
        if (this.flexible) { flags |= 1 << 5; }
        if (this.phoneToProvider) { flags |= 1 << 6; }
        if (this.emailToProvider) { flags |= 1 << 7; }
        if (this.recurring) { flags |= 1 << 9; }
        if (this.maxTipAmount !== undefined && this.maxTipAmount !== null) { flags |= 1 << 8; }
        if (this.suggestedTipAmounts !== undefined && this.suggestedTipAmounts !== null) { flags |= 1 << 8; }
        if (this.termsUrl !== undefined && this.termsUrl !== null) { flags |= 1 << 10; }
        if (this.subscriptionPeriod !== undefined && this.subscriptionPeriod !== null) { flags |= 1 << 11; }
        writer.writeInt(flags, false);
        if (this.test !== undefined && this.test !== null) {
        }
        if (this.nameRequested !== undefined && this.nameRequested !== null) {
        }
        if (this.phoneRequested !== undefined && this.phoneRequested !== null) {
        }
        if (this.emailRequested !== undefined && this.emailRequested !== null) {
        }
        if (this.shippingAddressRequested !== undefined && this.shippingAddressRequested !== null) {
        }
        if (this.flexible !== undefined && this.flexible !== null) {
        }
        if (this.phoneToProvider !== undefined && this.phoneToProvider !== null) {
        }
        if (this.emailToProvider !== undefined && this.emailToProvider !== null) {
        }
        if (this.recurring !== undefined && this.recurring !== null) {
        }
        writer.tgWriteString(this.currency);
        writer.writeVector(this.prices, (item) => {
            writer.write(item.getBytes());
        });
        if (this.maxTipAmount !== undefined && this.maxTipAmount !== null) {
            writer.writeLargeInt(this.maxTipAmount, 64);
        }
        if (this.suggestedTipAmounts !== undefined && this.suggestedTipAmounts !== null) {
            writer.writeVector(this.suggestedTipAmounts, (item) => {
                writer.writeLargeInt(item, 64);
            });
        }
        if (this.termsUrl !== undefined && this.termsUrl !== null) {
            writer.tgWriteString(this.termsUrl);
        }
        if (this.subscriptionPeriod !== undefined && this.subscriptionPeriod !== null) {
            writer.writeInt(this.subscriptionPeriod);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Invoice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _test = true;
            args.test = _test;
        } else {
            args.test = false;
        }
        if (args.flags & (1 << 1)) {
            const _nameRequested = true;
            args.nameRequested = _nameRequested;
        } else {
            args.nameRequested = false;
        }
        if (args.flags & (1 << 2)) {
            const _phoneRequested = true;
            args.phoneRequested = _phoneRequested;
        } else {
            args.phoneRequested = false;
        }
        if (args.flags & (1 << 3)) {
            const _emailRequested = true;
            args.emailRequested = _emailRequested;
        } else {
            args.emailRequested = false;
        }
        if (args.flags & (1 << 4)) {
            const _shippingAddressRequested = true;
            args.shippingAddressRequested = _shippingAddressRequested;
        } else {
            args.shippingAddressRequested = false;
        }
        if (args.flags & (1 << 5)) {
            const _flexible = true;
            args.flexible = _flexible;
        } else {
            args.flexible = false;
        }
        if (args.flags & (1 << 6)) {
            const _phoneToProvider = true;
            args.phoneToProvider = _phoneToProvider;
        } else {
            args.phoneToProvider = false;
        }
        if (args.flags & (1 << 7)) {
            const _emailToProvider = true;
            args.emailToProvider = _emailToProvider;
        } else {
            args.emailToProvider = false;
        }
        if (args.flags & (1 << 9)) {
            const _recurring = true;
            args.recurring = _recurring;
        } else {
            args.recurring = false;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _prices = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.prices = _prices;
        if (args.flags & (1 << 8)) {
            const _maxTipAmount = reader.readLargeInt(64);
            args.maxTipAmount = _maxTipAmount;
        } else {
            args.maxTipAmount = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _suggestedTipAmounts = reader.readVector((reader) => {
                const item = reader.readLargeInt(64);
                return item;
            });
            args.suggestedTipAmounts = _suggestedTipAmounts;
        } else {
            args.suggestedTipAmounts = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _termsUrl = reader.tgReadString();
            args.termsUrl = _termsUrl;
        } else {
            args.termsUrl = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _subscriptionPeriod = reader.readInt();
            args.subscriptionPeriod = _subscriptionPeriod;
        } else {
            args.subscriptionPeriod = undefined;
        }
        return new Invoice(args);
    }
}