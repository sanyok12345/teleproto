import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWebDocument } from "./TypeWebDocument";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class BotInlineMessageMediaInvoice extends TLObject {
    static CONSTRUCTOR_ID = 894081801;
    static SUBCLASS_OF_ID = 3297841032;
    static className = "BotInlineMessageMediaInvoice";
    static classType = "constructor";

    flags!: number;
    shippingAddressRequested?: boolean;
    test?: boolean;
    title!: string;
    description!: string;
    photo?: TypeWebDocument;
    currency!: string;
    totalAmount!: bigint;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, shippingAddressRequested?: boolean, test?: boolean, title?: string, description?: string, photo?: TypeWebDocument, currency?: string, totalAmount?: bigint, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.shippingAddressRequested = args.shippingAddressRequested;
        this.test = args.test;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(894081801, false);
        let flags = 0;
        if (this.shippingAddressRequested) { flags |= 1 << 1; }
        if (this.test) { flags |= 1 << 3; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 0; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.shippingAddressRequested !== undefined && this.shippingAddressRequested !== null) {
        }
        if (this.test !== undefined && this.test !== null) {
        }
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInlineMessageMediaInvoice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _shippingAddressRequested = true;
            args.shippingAddressRequested = _shippingAddressRequested;
        } else {
            args.shippingAddressRequested = false;
        }
        if (args.flags & (1 << 3)) {
            const _test = true;
            args.test = _test;
        } else {
            args.test = false;
        }
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        if (args.flags & (1 << 0)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new BotInlineMessageMediaInvoice(args);
    }
}