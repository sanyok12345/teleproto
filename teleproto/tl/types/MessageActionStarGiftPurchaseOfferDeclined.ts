import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class MessageActionStarGiftPurchaseOfferDeclined extends TLObject {
    static CONSTRUCTOR_ID = 1940760427;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionStarGiftPurchaseOfferDeclined";
    static classType = "constructor";

    flags!: number;
    expired?: boolean;
    gift!: TypeStarGift;
    price!: TypeStarsAmount;

    constructor(args: { flags?: number, expired?: boolean, gift?: TypeStarGift, price?: TypeStarsAmount } = {}) {
        super();
        this.flags = args.flags!;
        this.expired = args.expired;
        this.gift = args.gift!;
        this.price = args.price!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1940760427, false);
        let flags = 0;
        if (this.expired) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.expired !== undefined && this.expired !== null) {
        }
        writer.write(this.gift.getBytes());
        writer.write(this.price.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionStarGiftPurchaseOfferDeclined {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _expired = true;
            args.expired = _expired;
        } else {
            args.expired = false;
        }
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _price = reader.tgReadObject();
        args.price = _price;
        return new MessageActionStarGiftPurchaseOfferDeclined(args);
    }
}