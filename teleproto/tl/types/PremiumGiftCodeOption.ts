import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PremiumGiftCodeOption extends TLObject {
    static CONSTRUCTOR_ID = 629052971;
    static SUBCLASS_OF_ID = 2216898;
    static className = "PremiumGiftCodeOption";
    static classType = "constructor";

    flags!: number;
    users!: number;
    months!: number;
    storeProduct?: string;
    storeQuantity?: number;
    currency!: string;
    amount!: bigint;

    constructor(args: { flags?: number, users?: number, months?: number, storeProduct?: string, storeQuantity?: number, currency?: string, amount?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.users = args.users!;
        this.months = args.months!;
        this.storeProduct = args.storeProduct;
        this.storeQuantity = args.storeQuantity;
        this.currency = args.currency!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(629052971, false);
        let flags = 0;
        if (this.storeProduct !== undefined && this.storeProduct !== null) { flags |= 1 << 0; }
        if (this.storeQuantity !== undefined && this.storeQuantity !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeInt(this.users);
        writer.writeInt(this.months);
        if (this.storeProduct !== undefined && this.storeProduct !== null) {
            writer.tgWriteString(this.storeProduct);
        }
        if (this.storeQuantity !== undefined && this.storeQuantity !== null) {
            writer.writeInt(this.storeQuantity);
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PremiumGiftCodeOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _users = reader.readInt();
        args.users = _users;
        const _months = reader.readInt();
        args.months = _months;
        if (args.flags & (1 << 0)) {
            const _storeProduct = reader.tgReadString();
            args.storeProduct = _storeProduct;
        } else {
            args.storeProduct = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _storeQuantity = reader.readInt();
            args.storeQuantity = _storeQuantity;
        } else {
            args.storeQuantity = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new PremiumGiftCodeOption(args);
    }
}