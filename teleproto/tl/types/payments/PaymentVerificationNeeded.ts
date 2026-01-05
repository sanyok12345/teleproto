import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PaymentVerificationNeeded extends TLObject {
    static CONSTRUCTOR_ID = 3628142905;
    static SUBCLASS_OF_ID = 2330028701;
    static className = "payments.PaymentVerificationNeeded";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3628142905, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentVerificationNeeded {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new PaymentVerificationNeeded(args);
    }
}