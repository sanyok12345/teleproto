import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";

export class MessageMediaGeoLive extends TLObject {
    static CONSTRUCTOR_ID = 3108030054;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaGeoLive";
    static classType = "constructor";

    flags!: number;
    geo!: TypeGeoPoint;
    heading?: number;
    period!: number;
    proximityNotificationRadius?: number;

    constructor(args: { flags?: number, geo?: TypeGeoPoint, heading?: number, period?: number, proximityNotificationRadius?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.geo = args.geo!;
        this.heading = args.heading;
        this.period = args.period!;
        this.proximityNotificationRadius = args.proximityNotificationRadius;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3108030054, false);
        let flags = 0;
        if (this.heading !== undefined && this.heading !== null) { flags |= 1 << 0; }
        if (this.proximityNotificationRadius !== undefined && this.proximityNotificationRadius !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.geo.getBytes());
        if (this.heading !== undefined && this.heading !== null) {
            writer.writeInt(this.heading);
        }
        writer.writeInt(this.period);
        if (this.proximityNotificationRadius !== undefined && this.proximityNotificationRadius !== null) {
            writer.writeInt(this.proximityNotificationRadius);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaGeoLive {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _geo = reader.tgReadObject();
        args.geo = _geo;
        if (args.flags & (1 << 0)) {
            const _heading = reader.readInt();
            args.heading = _heading;
        } else {
            args.heading = undefined;
        }
        const _period = reader.readInt();
        args.period = _period;
        if (args.flags & (1 << 1)) {
            const _proximityNotificationRadius = reader.readInt();
            args.proximityNotificationRadius = _proximityNotificationRadius;
        } else {
            args.proximityNotificationRadius = undefined;
        }
        return new MessageMediaGeoLive(args);
    }
}