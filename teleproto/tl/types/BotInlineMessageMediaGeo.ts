import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class BotInlineMessageMediaGeo extends TLObject {
    static CONSTRUCTOR_ID = 85477117;
    static SUBCLASS_OF_ID = 3297841032;
    static className = "BotInlineMessageMediaGeo";
    static classType = "constructor";

    flags!: number;
    geo!: TypeGeoPoint;
    heading?: number;
    period?: number;
    proximityNotificationRadius?: number;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, geo?: TypeGeoPoint, heading?: number, period?: number, proximityNotificationRadius?: number, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.geo = args.geo!;
        this.heading = args.heading;
        this.period = args.period;
        this.proximityNotificationRadius = args.proximityNotificationRadius;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(85477117, false);
        let flags = 0;
        if (this.heading !== undefined && this.heading !== null) { flags |= 1 << 0; }
        if (this.period !== undefined && this.period !== null) { flags |= 1 << 1; }
        if (this.proximityNotificationRadius !== undefined && this.proximityNotificationRadius !== null) { flags |= 1 << 3; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write(this.geo.getBytes());
        if (this.heading !== undefined && this.heading !== null) {
            writer.writeInt(this.heading);
        }
        if (this.period !== undefined && this.period !== null) {
            writer.writeInt(this.period);
        }
        if (this.proximityNotificationRadius !== undefined && this.proximityNotificationRadius !== null) {
            writer.writeInt(this.proximityNotificationRadius);
        }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInlineMessageMediaGeo {
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
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new BotInlineMessageMediaGeo(args);
    }
}