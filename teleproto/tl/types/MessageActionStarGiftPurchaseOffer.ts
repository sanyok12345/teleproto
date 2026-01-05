import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class MessageActionStarGiftPurchaseOffer extends TLObject {
    static CONSTRUCTOR_ID = 2000845012;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionStarGiftPurchaseOffer";
    static classType = "constructor";

    flags!: number;
    accepted?: boolean;
    declined?: boolean;
    gift!: TypeStarGift;
    price!: TypeStarsAmount;
    expiresAt!: number;

    constructor(args: { flags?: number, accepted?: boolean, declined?: boolean, gift?: TypeStarGift, price?: TypeStarsAmount, expiresAt?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.accepted = args.accepted;
        this.declined = args.declined;
        this.gift = args.gift!;
        this.price = args.price!;
        this.expiresAt = args.expiresAt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2000845012, false);
        let flags = 0;
        if (this.accepted) { flags |= 1 << 0; }
        if (this.declined) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.accepted !== undefined && this.accepted !== null) {
        }
        if (this.declined !== undefined && this.declined !== null) {
        }
        writer.write(this.gift.getBytes());
        writer.write(this.price.getBytes());
        writer.writeInt(this.expiresAt);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionStarGiftPurchaseOffer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _accepted = true;
            args.accepted = _accepted;
        } else {
            args.accepted = false;
        }
        if (args.flags & (1 << 1)) {
            const _declined = true;
            args.declined = _declined;
        } else {
            args.declined = false;
        }
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _price = reader.tgReadObject();
        args.price = _price;
        const _expiresAt = reader.readInt();
        args.expiresAt = _expiresAt;
        return new MessageActionStarGiftPurchaseOffer(args);
    }
}