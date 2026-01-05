import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWebDocument } from "../TypeWebDocument";
import { TypeInvoice } from "../TypeInvoice";
import { TypeUser } from "../TypeUser";

export class PaymentReceiptStars extends TLObject {
    static CONSTRUCTOR_ID = 3669751866;
    static SUBCLASS_OF_ID = 1493210057;
    static className = "payments.PaymentReceiptStars";
    static classType = "constructor";

    flags!: number;
    date!: number;
    botId!: bigint;
    title!: string;
    description!: string;
    photo?: TypeWebDocument;
    invoice!: TypeInvoice;
    currency!: string;
    totalAmount!: bigint;
    transactionId!: string;
    users!: TypeUser[];

    constructor(args: { flags?: number, date?: number, botId?: bigint, title?: string, description?: string, photo?: TypeWebDocument, invoice?: TypeInvoice, currency?: string, totalAmount?: bigint, transactionId?: string, users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.date = args.date!;
        this.botId = args.botId!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.invoice = args.invoice!;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.transactionId = args.transactionId!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3669751866, false);
        let flags = 0;
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.write(this.invoice.getBytes());
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        writer.tgWriteString(this.transactionId);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentReceiptStars {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _date = reader.readInt();
        args.date = _date;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
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
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
        const _transactionId = reader.tgReadString();
        args.transactionId = _transactionId;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PaymentReceiptStars(args);
    }
}