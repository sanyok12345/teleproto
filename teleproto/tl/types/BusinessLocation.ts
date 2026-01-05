import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";

export class BusinessLocation extends TLObject {
    static CONSTRUCTOR_ID = 2891717367;
    static SUBCLASS_OF_ID = 2578238160;
    static className = "BusinessLocation";
    static classType = "constructor";

    flags!: number;
    geoPoint?: TypeGeoPoint;
    address!: string;

    constructor(args: { flags?: number, geoPoint?: TypeGeoPoint, address?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.geoPoint = args.geoPoint;
        this.address = args.address!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2891717367, false);
        let flags = 0;
        if (this.geoPoint !== undefined && this.geoPoint !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.geoPoint !== undefined && this.geoPoint !== null) {
            writer.write(this.geoPoint.getBytes());
        }
        writer.tgWriteString(this.address);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessLocation {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _geoPoint = reader.tgReadObject();
            args.geoPoint = _geoPoint;
        } else {
            args.geoPoint = undefined;
        }
        const _address = reader.tgReadString();
        args.address = _address;
        return new BusinessLocation(args);
    }
}