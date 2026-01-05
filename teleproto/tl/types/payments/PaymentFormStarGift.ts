import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeInvoice } from "../TypeInvoice";

export class PaymentFormStarGift extends TLObject {
    static CONSTRUCTOR_ID = 3022376929;
    static SUBCLASS_OF_ID = 2689089305;
    static className = "payments.PaymentFormStarGift";
    static classType = "constructor";

    formId!: bigint;
    invoice!: TypeInvoice;

    constructor(args: { formId?: bigint, invoice?: TypeInvoice } = {}) {
        super();
        this.formId = args.formId!;
        this.invoice = args.invoice!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3022376929, false);
        writer.writeLargeInt(this.formId, 64);
        writer.write(this.invoice.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentFormStarGift {
        const args: any = {};
        const _formId = reader.readLargeInt(64);
        args.formId = _formId;
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        return new PaymentFormStarGift(args);
    }
}