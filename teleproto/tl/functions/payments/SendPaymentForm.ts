import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputInvoice } from "../../types/TypeInputInvoice";
import { TypeInputPaymentCredentials } from "../../types/TypeInputPaymentCredentials";
import { TypePaymentResult } from "../../types/payments/TypePaymentResult";

export class SendPaymentForm extends MTProtoRequest {
    static CONSTRUCTOR_ID = 755192367;
    static SUBCLASS_OF_ID = 2330028701;
    static className = "payments.SendPaymentForm";
    static classType = "request";

    flags?: number;
    formId!: bigint;
    invoice!: TypeInputInvoice;
    requestedInfoId?: string;
    shippingOptionId?: string;
    credentials!: TypeInputPaymentCredentials;
    tipAmount?: bigint;

    constructor(args: { flags?: number, formId?: bigint, invoice?: TypeInputInvoice, requestedInfoId?: string, shippingOptionId?: string, credentials?: TypeInputPaymentCredentials, tipAmount?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.formId = args.formId!;
        this.invoice = args.invoice!;
        this.requestedInfoId = args.requestedInfoId;
        this.shippingOptionId = args.shippingOptionId;
        this.credentials = args.credentials!;
        this.tipAmount = args.tipAmount;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(755192367, false);
        let flags = 0;
        if (this.requestedInfoId !== undefined && this.requestedInfoId !== null) { flags |= 1 << 0; }
        if (this.shippingOptionId !== undefined && this.shippingOptionId !== null) { flags |= 1 << 1; }
        if (this.tipAmount !== undefined && this.tipAmount !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.formId, 64);
        writer.write(this.invoice.getBytes());
        if (this.requestedInfoId !== undefined && this.requestedInfoId !== null) {
            writer.tgWriteString(this.requestedInfoId);
        }
        if (this.shippingOptionId !== undefined && this.shippingOptionId !== null) {
            writer.tgWriteString(this.shippingOptionId);
        }
        writer.write(this.credentials.getBytes());
        if (this.tipAmount !== undefined && this.tipAmount !== null) {
            writer.writeLargeInt(this.tipAmount, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePaymentResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendPaymentForm {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _formId = reader.readLargeInt(64);
        args.formId = _formId;
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        if (args.flags & (1 << 0)) {
            const _requestedInfoId = reader.tgReadString();
            args.requestedInfoId = _requestedInfoId;
        } else {
            args.requestedInfoId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _shippingOptionId = reader.tgReadString();
            args.shippingOptionId = _shippingOptionId;
        } else {
            args.shippingOptionId = undefined;
        }
        const _credentials = reader.tgReadObject();
        args.credentials = _credentials;
        if (args.flags & (1 << 2)) {
            const _tipAmount = reader.readLargeInt(64);
            args.tipAmount = _tipAmount;
        } else {
            args.tipAmount = undefined;
        }
        return new SendPaymentForm(args);
    }
}