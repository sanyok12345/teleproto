import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class MessageActionGiftPremium extends TLObject {
    static CONSTRUCTOR_ID = 1223234306;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGiftPremium";
    static classType = "constructor";

    flags!: number;
    currency!: string;
    amount!: bigint;
    days!: number;
    cryptoCurrency?: string;
    cryptoAmount?: bigint;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, currency?: string, amount?: bigint, days?: number, cryptoCurrency?: string, cryptoAmount?: bigint, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.days = args.days!;
        this.cryptoCurrency = args.cryptoCurrency;
        this.cryptoAmount = args.cryptoAmount;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1223234306, false);
        let flags = 0;
        if (this.cryptoCurrency !== undefined && this.cryptoCurrency !== null) { flags |= 1 << 0; }
        if (this.cryptoAmount !== undefined && this.cryptoAmount !== null) { flags |= 1 << 0; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        writer.writeInt(this.days);
        if (this.cryptoCurrency !== undefined && this.cryptoCurrency !== null) {
            writer.tgWriteString(this.cryptoCurrency);
        }
        if (this.cryptoAmount !== undefined && this.cryptoAmount !== null) {
            writer.writeLargeInt(this.cryptoAmount, 64);
        }
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGiftPremium {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _days = reader.readInt();
        args.days = _days;
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
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new MessageActionGiftPremium(args);
    }
}