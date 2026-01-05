import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGeoPoint } from "./TypeInputGeoPoint";

export class InputMediaVenue extends TLObject {
    static CONSTRUCTOR_ID = 3242007569;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaVenue";
    static classType = "constructor";

    geoPoint!: TypeInputGeoPoint;
    title!: string;
    address!: string;
    provider!: string;
    venueId!: string;
    venueType!: string;

    constructor(args: { geoPoint?: TypeInputGeoPoint, title?: string, address?: string, provider?: string, venueId?: string, venueType?: string } = {}) {
        super();
        this.geoPoint = args.geoPoint!;
        this.title = args.title!;
        this.address = args.address!;
        this.provider = args.provider!;
        this.venueId = args.venueId!;
        this.venueType = args.venueType!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3242007569, false);
        writer.write(this.geoPoint.getBytes());
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.address);
        writer.tgWriteString(this.provider);
        writer.tgWriteString(this.venueId);
        writer.tgWriteString(this.venueType);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaVenue {
        const args: any = {};
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
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
        return new InputMediaVenue(args);
    }
}