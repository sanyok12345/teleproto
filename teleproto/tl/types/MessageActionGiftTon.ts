import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionGiftTon extends TLObject {
    static CONSTRUCTOR_ID = 2829305497;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGiftTon";
    static classType = "constructor";

    flags!: number;
    currency!: string;
    amount!: bigint;
    cryptoCurrency!: string;
    cryptoAmount!: bigint;
    transactionId?: string;

    constructor(args: { flags?: number, currency?: string, amount?: bigint, cryptoCurrency?: string, cryptoAmount?: bigint, transactionId?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.cryptoCurrency = args.cryptoCurrency!;
        this.cryptoAmount = args.cryptoAmount!;
        this.transactionId = args.transactionId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2829305497, false);
        let flags = 0;
        if (this.transactionId !== undefined && this.transactionId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        writer.tgWriteString(this.cryptoCurrency);
        writer.writeLargeInt(this.cryptoAmount, 64);
        if (this.transactionId !== undefined && this.transactionId !== null) {
            writer.tgWriteString(this.transactionId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGiftTon {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _cryptoCurrency = reader.tgReadString();
        args.cryptoCurrency = _cryptoCurrency;
        const _cryptoAmount = reader.readLargeInt(64);
        args.cryptoAmount = _cryptoAmount;
        if (args.flags & (1 << 0)) {
            const _transactionId = reader.tgReadString();
            args.transactionId = _transactionId;
        } else {
            args.transactionId = undefined;
        }
        return new MessageActionGiftTon(args);
    }
}