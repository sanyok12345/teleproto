import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGeoPoint } from "./TypeInputGeoPoint";

export class InputWebFileGeoPointLocation extends TLObject {
    static CONSTRUCTOR_ID = 2669814217;
    static SUBCLASS_OF_ID = 4147042521;
    static className = "InputWebFileGeoPointLocation";
    static classType = "constructor";

    geoPoint!: TypeInputGeoPoint;
    accessHash!: bigint;
    w!: number;
    h!: number;
    zoom!: number;
    scale!: number;

    constructor(args: { geoPoint?: TypeInputGeoPoint, accessHash?: bigint, w?: number, h?: number, zoom?: number, scale?: number } = {}) {
        super();
        this.geoPoint = args.geoPoint!;
        this.accessHash = args.accessHash!;
        this.w = args.w!;
        this.h = args.h!;
        this.zoom = args.zoom!;
        this.scale = args.scale!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2669814217, false);
        writer.write(this.geoPoint.getBytes());
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        writer.writeInt(this.zoom);
        writer.writeInt(this.scale);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputWebFileGeoPointLocation {
        const args: any = {};
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        const _zoom = reader.readInt();
        args.zoom = _zoom;
        const _scale = reader.readInt();
        args.scale = _scale;
        return new InputWebFileGeoPointLocation(args);
    }
}