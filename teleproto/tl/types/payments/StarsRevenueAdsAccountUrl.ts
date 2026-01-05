import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StarsRevenueAdsAccountUrl extends TLObject {
    static CONSTRUCTOR_ID = 961445665;
    static SUBCLASS_OF_ID = 1243777813;
    static className = "payments.StarsRevenueAdsAccountUrl";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(961445665, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsRevenueAdsAccountUrl {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new StarsRevenueAdsAccountUrl(args);
    }
}