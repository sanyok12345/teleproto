import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStarGiftAuctionSlug extends TLObject {
    static CONSTRUCTOR_ID = 2058715912;
    static SUBCLASS_OF_ID = 1101130410;
    static className = "InputStarGiftAuctionSlug";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2058715912, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStarGiftAuctionSlug {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new InputStarGiftAuctionSlug(args);
    }
}