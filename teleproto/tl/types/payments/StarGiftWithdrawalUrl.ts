import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class StarGiftWithdrawalUrl extends TLObject {
    static CONSTRUCTOR_ID = 2225748636;
    static SUBCLASS_OF_ID = 2726440389;
    static className = "payments.StarGiftWithdrawalUrl";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2225748636, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftWithdrawalUrl {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new StarGiftWithdrawalUrl(args);
    }
}