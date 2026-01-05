import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ExportedInvoice extends TLObject {
    static CONSTRUCTOR_ID = 2932919257;
    static SUBCLASS_OF_ID = 907039794;
    static className = "payments.ExportedInvoice";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2932919257, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedInvoice {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new ExportedInvoice(args);
    }
}