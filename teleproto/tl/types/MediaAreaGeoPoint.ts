import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";
import { TypeGeoPoint } from "./TypeGeoPoint";
import { TypeGeoPointAddress } from "./TypeGeoPointAddress";

export class MediaAreaGeoPoint extends TLObject {
    static CONSTRUCTOR_ID = 3402974509;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaGeoPoint";
    static classType = "constructor";

    flags!: number;
    coordinates!: TypeMediaAreaCoordinates;
    geo!: TypeGeoPoint;
    address?: TypeGeoPointAddress;

    constructor(args: { flags?: number, coordinates?: TypeMediaAreaCoordinates, geo?: TypeGeoPoint, address?: TypeGeoPointAddress } = {}) {
        super();
        this.flags = args.flags!;
        this.coordinates = args.coordinates!;
        this.geo = args.geo!;
        this.address = args.address;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3402974509, false);
        let flags = 0;
        if (this.address !== undefined && this.address !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.coordinates.getBytes());
        writer.write(this.geo.getBytes());
        if (this.address !== undefined && this.address !== null) {
            writer.write(this.address.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaGeoPoint {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _geo = reader.tgReadObject();
        args.geo = _geo;
        if (args.flags & (1 << 0)) {
            const _address = reader.tgReadObject();
            args.address = _address;
        } else {
            args.address = undefined;
        }
        return new MediaAreaGeoPoint(args);
    }
}