import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";

export class WebPageAttributeStarGiftAuction extends TLObject {
    static CONSTRUCTOR_ID = 29770178;
    static SUBCLASS_OF_ID = 2949638599;
    static className = "WebPageAttributeStarGiftAuction";
    static classType = "constructor";

    gift!: TypeStarGift;
    endDate!: number;

    constructor(args: { gift?: TypeStarGift, endDate?: number } = {}) {
        super();
        this.gift = args.gift!;
        this.endDate = args.endDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(29770178, false);
        writer.write(this.gift.getBytes());
        writer.writeInt(this.endDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageAttributeStarGiftAuction {
        const args: any = {};
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _endDate = reader.readInt();
        args.endDate = _endDate;
        return new WebPageAttributeStarGiftAuction(args);
    }
}