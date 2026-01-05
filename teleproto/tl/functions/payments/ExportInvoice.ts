import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeExportedInvoice } from "../../types/payments/TypeExportedInvoice";

export class ExportInvoice extends MTProtoRequest {
    static CONSTRUCTOR_ID = 261206117;
    static SUBCLASS_OF_ID = 907039794;
    static className = "payments.ExportInvoice";
    static classType = "request";

    invoiceMedia!: TypeInputMedia;

    constructor(args: { invoiceMedia?: TypeInputMedia } = {}) {
        super();
        this.invoiceMedia = args.invoiceMedia!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(261206117, false);
        writer.write(this.invoiceMedia.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedInvoice {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportInvoice {
        const args: any = {};
        const _invoiceMedia = reader.tgReadObject();
        args.invoiceMedia = _invoiceMedia;
        return new ExportInvoice(args);
    }
}