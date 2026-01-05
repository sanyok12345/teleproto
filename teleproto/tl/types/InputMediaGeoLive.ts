import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGeoPoint } from "./TypeInputGeoPoint";

export class InputMediaGeoLive extends TLObject {
    static CONSTRUCTOR_ID = 2535434307;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaGeoLive";
    static classType = "constructor";

    flags!: number;
    stopped?: boolean;
    geoPoint!: TypeInputGeoPoint;
    heading?: number;
    period?: number;
    proximityNotificationRadius?: number;

    constructor(args: { flags?: number, stopped?: boolean, geoPoint?: TypeInputGeoPoint, heading?: number, period?: number, proximityNotificationRadius?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.stopped = args.stopped;
        this.geoPoint = args.geoPoint!;
        this.heading = args.heading;
        this.period = args.period;
        this.proximityNotificationRadius = args.proximityNotificationRadius;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2535434307, false);
        let flags = 0;
        if (this.stopped) { flags |= 1 << 0; }
        if (this.heading !== undefined && this.heading !== null) { flags |= 1 << 2; }
        if (this.period !== undefined && this.period !== null) { flags |= 1 << 1; }
        if (this.proximityNotificationRadius !== undefined && this.proximityNotificationRadius !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.stopped !== undefined && this.stopped !== null) {
        }
        writer.write(this.geoPoint.getBytes());
        if (this.heading !== undefined && this.heading !== null) {
            writer.writeInt(this.heading);
        }
        if (this.period !== undefined && this.period !== null) {
            writer.writeInt(this.period);
        }
        if (this.proximityNotificationRadius !== undefined && this.proximityNotificationRadius !== null) {
            writer.writeInt(this.proximityNotificationRadius);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaGeoLive {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _stopped = true;
            args.stopped = _stopped;
        } else {
            args.stopped = false;
        }
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
        if (args.flags & (1 << 2)) {
            const _heading = reader.readInt();
            args.heading = _heading;
        } else {
            args.heading = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _period = reader.readInt();
            args.period = _period;
        } else {
            args.period = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _proximityNotificationRadius = reader.readInt();
            args.proximityNotificationRadius = _proximityNotificationRadius;
        } else {
            args.proximityNotificationRadius = undefined;
        }
        return new InputMediaGeoLive(args);
    }
}