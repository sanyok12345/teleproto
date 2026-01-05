import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";

export class ChannelLocation extends TLObject {
    static CONSTRUCTOR_ID = 547062491;
    static SUBCLASS_OF_ID = 3961916287;
    static className = "ChannelLocation";
    static classType = "constructor";

    geoPoint!: TypeGeoPoint;
    address!: string;

    constructor(args: { geoPoint?: TypeGeoPoint, address?: string } = {}) {
        super();
        this.geoPoint = args.geoPoint!;
        this.address = args.address!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(547062491, false);
        writer.write(this.geoPoint.getBytes());
        writer.tgWriteString(this.address);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelLocation {
        const args: any = {};
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
        const _address = reader.tgReadString();
        args.address = _address;
        return new ChannelLocation(args);
    }
}