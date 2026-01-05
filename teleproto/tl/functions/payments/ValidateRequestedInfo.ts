import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputInvoice } from "../../types/TypeInputInvoice";
import { TypePaymentRequestedInfo } from "../../types/TypePaymentRequestedInfo";
import { TypeValidatedRequestedInfo } from "../../types/payments/TypeValidatedRequestedInfo";

export class ValidateRequestedInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3066622251;
    static SUBCLASS_OF_ID = 2407548087;
    static className = "payments.ValidateRequestedInfo";
    static classType = "request";

    flags?: number;
    save?: boolean;
    invoice!: TypeInputInvoice;
    info!: TypePaymentRequestedInfo;

    constructor(args: { flags?: number, save?: boolean, invoice?: TypeInputInvoice, info?: TypePaymentRequestedInfo } = {}) {
        super();
        this.flags = args.flags;
        this.save = args.save;
        this.invoice = args.invoice!;
        this.info = args.info!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3066622251, false);
        let flags = 0;
        if (this.save) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.save !== undefined && this.save !== null) {
        }
        writer.write(this.invoice.getBytes());
        writer.write(this.info.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeValidatedRequestedInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ValidateRequestedInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _save = true;
            args.save = _save;
        } else {
            args.save = false;
        }
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        const _info = reader.tgReadObject();
        args.info = _info;
        return new ValidateRequestedInfo(args);
    }
}