import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputInvoice } from "../../types/TypeInputInvoice";
import { TypePaymentResult } from "../../types/payments/TypePaymentResult";

export class SendStarsForm extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2040056084;
    static SUBCLASS_OF_ID = 2330028701;
    static className = "payments.SendStarsForm";
    static classType = "request";

    formId!: bigint;
    invoice!: TypeInputInvoice;

    constructor(args: { formId?: bigint, invoice?: TypeInputInvoice } = {}) {
        super();
        this.formId = args.formId!;
        this.invoice = args.invoice!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2040056084, false);
        writer.writeLargeInt(this.formId, 64);
        writer.write(this.invoice.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePaymentResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendStarsForm {
        const args: any = {};
        const _formId = reader.readLargeInt(64);
        args.formId = _formId;
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        return new SendStarsForm(args);
    }
}