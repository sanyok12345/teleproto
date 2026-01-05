import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputInvoiceSlug extends TLObject {
    static CONSTRUCTOR_ID = 3274099439;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceSlug";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3274099439, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceSlug {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new InputInvoiceSlug(args);
    }
}