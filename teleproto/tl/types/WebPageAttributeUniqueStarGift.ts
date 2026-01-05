import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";

export class WebPageAttributeUniqueStarGift extends TLObject {
    static CONSTRUCTOR_ID = 3480186296;
    static SUBCLASS_OF_ID = 2949638599;
    static className = "WebPageAttributeUniqueStarGift";
    static classType = "constructor";

    gift!: TypeStarGift;

    constructor(args: { gift?: TypeStarGift } = {}) {
        super();
        this.gift = args.gift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3480186296, false);
        writer.write(this.gift.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageAttributeUniqueStarGift {
        const args: any = {};
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        return new WebPageAttributeUniqueStarGift(args);
    }
}