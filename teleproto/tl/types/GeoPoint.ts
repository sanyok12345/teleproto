import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class GeoPoint extends TLObject {
    static CONSTRUCTOR_ID = 2997024355;
    static SUBCLASS_OF_ID = 3591430509;
    static className = "GeoPoint";
    static classType = "constructor";

    flags!: number;
    long!: number;
    lat!: number;
    accessHash!: bigint;
    accuracyRadius?: number;

    constructor(args: { flags?: number, long?: number, lat?: number, accessHash?: bigint, accuracyRadius?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.long = args.long!;
        this.lat = args.lat!;
        this.accessHash = args.accessHash!;
        this.accuracyRadius = args.accuracyRadius;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2997024355, false);
        let flags = 0;
        if (this.accuracyRadius !== undefined && this.accuracyRadius !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeDouble(this.long);
        writer.writeDouble(this.lat);
        writer.writeLargeInt(this.accessHash, 64);
        if (this.accuracyRadius !== undefined && this.accuracyRadius !== null) {
            writer.writeInt(this.accuracyRadius);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GeoPoint {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _long = reader.readDouble();
        args.long = _long;
        const _lat = reader.readDouble();
        args.lat = _lat;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        if (args.flags & (1 << 0)) {
            const _accuracyRadius = reader.readInt();
            args.accuracyRadius = _accuracyRadius;
        } else {
            args.accuracyRadius = undefined;
        }
        return new GeoPoint(args);
    }
}