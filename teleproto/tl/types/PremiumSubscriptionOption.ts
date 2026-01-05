import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PremiumSubscriptionOption extends TLObject {
    static CONSTRUCTOR_ID = 1596792306;
    static SUBCLASS_OF_ID = 774752063;
    static className = "PremiumSubscriptionOption";
    static classType = "constructor";

    flags!: number;
    current?: boolean;
    canPurchaseUpgrade?: boolean;
    transaction?: string;
    months!: number;
    currency!: string;
    amount!: bigint;
    botUrl!: string;
    storeProduct?: string;

    constructor(args: { flags?: number, current?: boolean, canPurchaseUpgrade?: boolean, transaction?: string, months?: number, currency?: string, amount?: bigint, botUrl?: string, storeProduct?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.current = args.current;
        this.canPurchaseUpgrade = args.canPurchaseUpgrade;
        this.transaction = args.transaction;
        this.months = args.months!;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.botUrl = args.botUrl!;
        this.storeProduct = args.storeProduct;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1596792306, false);
        let flags = 0;
        if (this.current) { flags |= 1 << 1; }
        if (this.canPurchaseUpgrade) { flags |= 1 << 2; }
        if (this.transaction !== undefined && this.transaction !== null) { flags |= 1 << 3; }
        if (this.storeProduct !== undefined && this.storeProduct !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.current !== undefined && this.current !== null) {
        }
        if (this.canPurchaseUpgrade !== undefined && this.canPurchaseUpgrade !== null) {
        }
        if (this.transaction !== undefined && this.transaction !== null) {
            writer.tgWriteString(this.transaction);
        }
        writer.writeInt(this.months);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        writer.tgWriteString(this.botUrl);
        if (this.storeProduct !== undefined && this.storeProduct !== null) {
            writer.tgWriteString(this.storeProduct);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PremiumSubscriptionOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _current = true;
            args.current = _current;
        } else {
            args.current = false;
        }
        if (args.flags & (1 << 2)) {
            const _canPurchaseUpgrade = true;
            args.canPurchaseUpgrade = _canPurchaseUpgrade;
        } else {
            args.canPurchaseUpgrade = false;
        }
        if (args.flags & (1 << 3)) {
            const _transaction = reader.tgReadString();
            args.transaction = _transaction;
        } else {
            args.transaction = undefined;
        }
        const _months = reader.readInt();
        args.months = _months;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _botUrl = reader.tgReadString();
        args.botUrl = _botUrl;
        if (args.flags & (1 << 0)) {
            const _storeProduct = reader.tgReadString();
            args.storeProduct = _storeProduct;
        } else {
            args.storeProduct = undefined;
        }
        return new PremiumSubscriptionOption(args);
    }
}