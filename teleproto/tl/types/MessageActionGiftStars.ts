import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionGiftStars extends TLObject {
    static CONSTRUCTOR_ID = 1171632161;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGiftStars";
    static classType = "constructor";

    flags!: number;
    currency!: string;
    amount!: bigint;
    stars!: bigint;
    cryptoCurrency?: string;
    cryptoAmount?: bigint;
    transactionId?: string;

    constructor(args: { flags?: number, currency?: string, amount?: bigint, stars?: bigint, cryptoCurrency?: string, cryptoAmount?: bigint, transactionId?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.stars = args.stars!;
        this.cryptoCurrency = args.cryptoCurrency;
        this.cryptoAmount = args.cryptoAmount;
        this.transactionId = args.transactionId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1171632161, false);
        let flags = 0;
        if (this.cryptoCurrency !== undefined && this.cryptoCurrency !== null) { flags |= 1 << 0; }
        if (this.cryptoAmount !== undefined && this.cryptoAmount !== null) { flags |= 1 << 0; }
        if (this.transactionId !== undefined && this.transactionId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        writer.writeLargeInt(this.stars, 64);
        if (this.cryptoCurrency !== undefined && this.cryptoCurrency !== null) {
            writer.tgWriteString(this.cryptoCurrency);
        }
        if (this.cryptoAmount !== undefined && this.cryptoAmount !== null) {
            writer.writeLargeInt(this.cryptoAmount, 64);
        }
        if (this.transactionId !== undefined && this.transactionId !== null) {
            writer.tgWriteString(this.transactionId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGiftStars {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        if (args.flags & (1 << 0)) {
            const _cryptoCurrency = reader.tgReadString();
            args.cryptoCurrency = _cryptoCurrency;
        } else {
            args.cryptoCurrency = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _cryptoAmount = reader.readLargeInt(64);
            args.cryptoAmount = _cryptoAmount;
        } else {
            args.cryptoAmount = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _transactionId = reader.tgReadString();
            args.transactionId = _transactionId;
        } else {
            args.transactionId = undefined;
        }
        return new MessageActionGiftStars(args);
    }
}