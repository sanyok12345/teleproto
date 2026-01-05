import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputInvoice } from "../../types/TypeInputInvoice";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypePaymentForm } from "../../types/payments/TypePaymentForm";

export class GetPaymentForm extends MTProtoRequest {
    static CONSTRUCTOR_ID = 924093883;
    static SUBCLASS_OF_ID = 2689089305;
    static className = "payments.GetPaymentForm";
    static classType = "request";

    flags?: number;
    invoice!: TypeInputInvoice;
    themeParams?: TypeDataJSON;

    constructor(args: { flags?: number, invoice?: TypeInputInvoice, themeParams?: TypeDataJSON } = {}) {
        super();
        this.flags = args.flags;
        this.invoice = args.invoice!;
        this.themeParams = args.themeParams;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(924093883, false);
        let flags = 0;
        if (this.themeParams !== undefined && this.themeParams !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.invoice.getBytes());
        if (this.themeParams !== undefined && this.themeParams !== null) {
            writer.write(this.themeParams.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePaymentForm {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPaymentForm {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        if (args.flags & (1 << 0)) {
            const _themeParams = reader.tgReadObject();
            args.themeParams = _themeParams;
        } else {
            args.themeParams = undefined;
        }
        return new GetPaymentForm(args);
    }
}