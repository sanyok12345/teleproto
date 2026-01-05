import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StarsRevenueWithdrawalUrl extends TLObject {
    static CONSTRUCTOR_ID = 497778871;
    static SUBCLASS_OF_ID = 2221318382;
    static className = "payments.StarsRevenueWithdrawalUrl";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(497778871, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsRevenueWithdrawalUrl {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new StarsRevenueWithdrawalUrl(args);
    }
}