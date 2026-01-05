import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWebDocument } from "../TypeWebDocument";
import { TypeInvoice } from "../TypeInvoice";
import { TypePaymentRequestedInfo } from "../TypePaymentRequestedInfo";
import { TypeShippingOption } from "../TypeShippingOption";
import { TypeUser } from "../TypeUser";

export class PaymentReceipt extends TLObject {
    static CONSTRUCTOR_ID = 1891958275;
    static SUBCLASS_OF_ID = 1493210057;
    static className = "payments.PaymentReceipt";
    static classType = "constructor";

    flags!: number;
    date!: number;
    botId!: bigint;
    providerId!: bigint;
    title!: string;
    description!: string;
    photo?: TypeWebDocument;
    invoice!: TypeInvoice;
    info?: TypePaymentRequestedInfo;
    shipping?: TypeShippingOption;
    tipAmount?: bigint;
    currency!: string;
    totalAmount!: bigint;
    credentialsTitle!: string;
    users!: TypeUser[];

    constructor(args: { flags?: number, date?: number, botId?: bigint, providerId?: bigint, title?: string, description?: string, photo?: TypeWebDocument, invoice?: TypeInvoice, info?: TypePaymentRequestedInfo, shipping?: TypeShippingOption, tipAmount?: bigint, currency?: string, totalAmount?: bigint, credentialsTitle?: string, users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.date = args.date!;
        this.botId = args.botId!;
        this.providerId = args.providerId!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.invoice = args.invoice!;
        this.info = args.info;
        this.shipping = args.shipping;
        this.tipAmount = args.tipAmount;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.credentialsTitle = args.credentialsTitle!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1891958275, false);
        let flags = 0;
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 2; }
        if (this.info !== undefined && this.info !== null) { flags |= 1 << 0; }
        if (this.shipping !== undefined && this.shipping !== null) { flags |= 1 << 1; }
        if (this.tipAmount !== undefined && this.tipAmount !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.botId, 64);
        writer.writeLargeInt(this.providerId, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.write(this.invoice.getBytes());
        if (this.info !== undefined && this.info !== null) {
            writer.write(this.info.getBytes());
        }
        if (this.shipping !== undefined && this.shipping !== null) {
            writer.write(this.shipping.getBytes());
        }
        if (this.tipAmount !== undefined && this.tipAmount !== null) {
            writer.writeLargeInt(this.tipAmount, 64);
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        writer.tgWriteString(this.credentialsTitle);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentReceipt {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _date = reader.readInt();
        args.date = _date;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _providerId = reader.readLargeInt(64);
        args.providerId = _providerId;
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        if (args.flags & (1 << 2)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        if (args.flags & (1 << 0)) {
            const _info = reader.tgReadObject();
            args.info = _info;
        } else {
            args.info = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _shipping = reader.tgReadObject();
            args.shipping = _shipping;
        } else {
            args.shipping = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _tipAmount = reader.readLargeInt(64);
            args.tipAmount = _tipAmount;
        } else {
            args.tipAmount = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
        const _credentialsTitle = reader.tgReadString();
        args.credentialsTitle = _credentialsTitle;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PaymentReceipt(args);
    }
}