import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CollectibleInfo extends TLObject {
    static CONSTRUCTOR_ID = 1857945489;
    static SUBCLASS_OF_ID = 3572127632;
    static className = "fragment.CollectibleInfo";
    static classType = "constructor";

    purchaseDate!: number;
    currency!: string;
    amount!: bigint;
    cryptoCurrency!: string;
    cryptoAmount!: bigint;
    url!: string;

    constructor(args: { purchaseDate?: number, currency?: string, amount?: bigint, cryptoCurrency?: string, cryptoAmount?: bigint, url?: string } = {}) {
        super();
        this.purchaseDate = args.purchaseDate!;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.cryptoCurrency = args.cryptoCurrency!;
        this.cryptoAmount = args.cryptoAmount!;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1857945489, false);
        writer.writeInt(this.purchaseDate);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        writer.tgWriteString(this.cryptoCurrency);
        writer.writeLargeInt(this.cryptoAmount, 64);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CollectibleInfo {
        const args: any = {};
        const _purchaseDate = reader.readInt();
        args.purchaseDate = _purchaseDate;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _cryptoCurrency = reader.tgReadString();
        args.cryptoCurrency = _cryptoCurrency;
        const _cryptoAmount = reader.readLargeInt(64);
        args.cryptoAmount = _cryptoAmount;
        const _url = reader.tgReadString();
        args.url = _url;
        return new CollectibleInfo(args);
    }
}