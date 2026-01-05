import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";

export class MediaAreaStarGift extends TLObject {
    static CONSTRUCTOR_ID = 1468491885;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaStarGift";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    slug!: string;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, slug?: string } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1468491885, false);
        writer.write(this.coordinates.getBytes());
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaStarGift {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new MediaAreaStarGift(args);
    }
}