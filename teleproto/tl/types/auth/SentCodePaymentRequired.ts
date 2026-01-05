import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodePaymentRequired extends TLObject {
    static CONSTRUCTOR_ID = 3767884348;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "auth.SentCodePaymentRequired";
    static classType = "constructor";

    storeProduct!: string;
    phoneCodeHash!: string;
    supportEmailAddress!: string;
    supportEmailSubject!: string;
    currency!: string;
    amount!: bigint;

    constructor(args: { storeProduct?: string, phoneCodeHash?: string, supportEmailAddress?: string, supportEmailSubject?: string, currency?: string, amount?: bigint } = {}) {
        super();
        this.storeProduct = args.storeProduct!;
        this.phoneCodeHash = args.phoneCodeHash!;
        this.supportEmailAddress = args.supportEmailAddress!;
        this.supportEmailSubject = args.supportEmailSubject!;
        this.currency = args.currency!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3767884348, false);
        writer.tgWriteString(this.storeProduct);
        writer.tgWriteString(this.phoneCodeHash);
        writer.tgWriteString(this.supportEmailAddress);
        writer.tgWriteString(this.supportEmailSubject);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodePaymentRequired {
        const args: any = {};
        const _storeProduct = reader.tgReadString();
        args.storeProduct = _storeProduct;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _supportEmailAddress = reader.tgReadString();
        args.supportEmailAddress = _supportEmailAddress;
        const _supportEmailSubject = reader.tgReadString();
        args.supportEmailSubject = _supportEmailSubject;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new SentCodePaymentRequired(args);
    }
}