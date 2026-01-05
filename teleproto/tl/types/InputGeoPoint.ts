import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputGeoPoint extends TLObject {
    static CONSTRUCTOR_ID = 1210199983;
    static SUBCLASS_OF_ID = 70308389;
    static className = "InputGeoPoint";
    static classType = "constructor";

    flags!: number;
    lat!: number;
    long!: number;
    accuracyRadius?: number;

    constructor(args: { flags?: number, lat?: number, long?: number, accuracyRadius?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.lat = args.lat!;
        this.long = args.long!;
        this.accuracyRadius = args.accuracyRadius;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1210199983, false);
        let flags = 0;
        if (this.accuracyRadius !== undefined && this.accuracyRadius !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeDouble(this.lat);
        writer.writeDouble(this.long);
        if (this.accuracyRadius !== undefined && this.accuracyRadius !== null) {
            writer.writeInt(this.accuracyRadius);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputGeoPoint {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _lat = reader.readDouble();
        args.lat = _lat;
        const _long = reader.readDouble();
        args.long = _long;
        if (args.flags & (1 << 0)) {
            const _accuracyRadius = reader.readInt();
            args.accuracyRadius = _accuracyRadius;
        } else {
            args.accuracyRadius = undefined;
        }
        return new InputGeoPoint(args);
    }
}