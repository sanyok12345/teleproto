import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PaymentFormMethod extends TLObject {
    static CONSTRUCTOR_ID = 2298016283;
    static SUBCLASS_OF_ID = 1069664278;
    static className = "PaymentFormMethod";
    static classType = "constructor";

    url!: string;
    title!: string;

    constructor(args: { url?: string, title?: string } = {}) {
        super();
        this.url = args.url!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2298016283, false);
        writer.tgWriteString(this.url);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentFormMethod {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _title = reader.tgReadString();
        args.title = _title;
        return new PaymentFormMethod(args);
    }
}