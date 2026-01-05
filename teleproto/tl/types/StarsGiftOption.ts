import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsGiftOption extends TLObject {
    static CONSTRUCTOR_ID = 1577421297;
    static SUBCLASS_OF_ID = 2848803767;
    static className = "StarsGiftOption";
    static classType = "constructor";

    flags!: number;
    extended?: boolean;
    stars!: bigint;
    storeProduct?: string;
    currency!: string;
    amount!: bigint;

    constructor(args: { flags?: number, extended?: boolean, stars?: bigint, storeProduct?: string, currency?: string, amount?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.extended = args.extended;
        this.stars = args.stars!;
        this.storeProduct = args.storeProduct;
        this.currency = args.currency!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1577421297, false);
        let flags = 0;
        if (this.extended) { flags |= 1 << 1; }
        if (this.storeProduct !== undefined && this.storeProduct !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.extended !== undefined && this.extended !== null) {
        }
        writer.writeLargeInt(this.stars, 64);
        if (this.storeProduct !== undefined && this.storeProduct !== null) {
            writer.tgWriteString(this.storeProduct);
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsGiftOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _extended = true;
            args.extended = _extended;
        } else {
            args.extended = false;
        }
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        if (args.flags & (1 << 0)) {
            const _storeProduct = reader.tgReadString();
            args.storeProduct = _storeProduct;
        } else {
            args.storeProduct = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new StarsGiftOption(args);
    }
}