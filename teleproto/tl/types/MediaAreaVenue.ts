import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";
import { TypeGeoPoint } from "./TypeGeoPoint";

export class MediaAreaVenue extends TLObject {
    static CONSTRUCTOR_ID = 3196246940;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaVenue";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    geo!: TypeGeoPoint;
    title!: string;
    address!: string;
    provider!: string;
    venueId!: string;
    venueType!: string;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, geo?: TypeGeoPoint, title?: string, address?: string, provider?: string, venueId?: string, venueType?: string } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.geo = args.geo!;
        this.title = args.title!;
        this.address = args.address!;
        this.provider = args.provider!;
        this.venueId = args.venueId!;
        this.venueType = args.venueType!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3196246940, false);
        writer.write(this.coordinates.getBytes());
        writer.write(this.geo.getBytes());
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.address);
        writer.tgWriteString(this.provider);
        writer.tgWriteString(this.venueId);
        writer.tgWriteString(this.venueType);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaVenue {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _geo = reader.tgReadObject();
        args.geo = _geo;
        const _title = reader.tgReadString();
        args.title = _title;
        const _address = reader.tgReadString();
        args.address = _address;
        const _provider = reader.tgReadString();
        args.provider = _provider;
        const _venueId = reader.tgReadString();
        args.venueId = _venueId;
        const _venueType = reader.tgReadString();
        args.venueType = _venueType;
        return new MediaAreaVenue(args);
    }
}