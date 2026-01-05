import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWebDocument } from "../TypeWebDocument";
import { TypeInvoice } from "../TypeInvoice";
import { TypeUser } from "../TypeUser";

export class PaymentFormStars extends TLObject {
    static CONSTRUCTOR_ID = 2079764828;
    static SUBCLASS_OF_ID = 2689089305;
    static className = "payments.PaymentFormStars";
    static classType = "constructor";

    flags!: number;
    formId!: bigint;
    botId!: bigint;
    title!: string;
    description!: string;
    photo?: TypeWebDocument;
    invoice!: TypeInvoice;
    users!: TypeUser[];

    constructor(args: { flags?: number, formId?: bigint, botId?: bigint, title?: string, description?: string, photo?: TypeWebDocument, invoice?: TypeInvoice, users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.formId = args.formId!;
        this.botId = args.botId!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.invoice = args.invoice!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2079764828, false);
        let flags = 0;
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.formId, 64);
        writer.writeLargeInt(this.botId, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.write(this.invoice.getBytes());
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentFormStars {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _formId = reader.readLargeInt(64);
        args.formId = _formId;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        if (args.flags & (1 << 5)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new PaymentFormStars(args);
    }
}