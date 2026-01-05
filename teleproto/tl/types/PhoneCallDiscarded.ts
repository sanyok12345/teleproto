import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoneCallDiscardReason } from "./TypePhoneCallDiscardReason";

export class PhoneCallDiscarded extends TLObject {
    static CONSTRUCTOR_ID = 1355435489;
    static SUBCLASS_OF_ID = 3296664529;
    static className = "PhoneCallDiscarded";
    static classType = "constructor";

    flags!: number;
    needRating?: boolean;
    needDebug?: boolean;
    video?: boolean;
    id!: bigint;
    reason?: TypePhoneCallDiscardReason;
    duration?: number;

    constructor(args: { flags?: number, needRating?: boolean, needDebug?: boolean, video?: boolean, id?: bigint, reason?: TypePhoneCallDiscardReason, duration?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.needRating = args.needRating;
        this.needDebug = args.needDebug;
        this.video = args.video;
        this.id = args.id!;
        this.reason = args.reason;
        this.duration = args.duration;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1355435489, false);
        let flags = 0;
        if (this.needRating) { flags |= 1 << 2; }
        if (this.needDebug) { flags |= 1 << 3; }
        if (this.video) { flags |= 1 << 6; }
        if (this.reason !== undefined && this.reason !== null) { flags |= 1 << 0; }
        if (this.duration !== undefined && this.duration !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.needRating !== undefined && this.needRating !== null) {
        }
        if (this.needDebug !== undefined && this.needDebug !== null) {
        }
        if (this.video !== undefined && this.video !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        if (this.reason !== undefined && this.reason !== null) {
            writer.write(this.reason.getBytes());
        }
        if (this.duration !== undefined && this.duration !== null) {
            writer.writeInt(this.duration);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallDiscarded {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _needRating = true;
            args.needRating = _needRating;
        } else {
            args.needRating = false;
        }
        if (args.flags & (1 << 3)) {
            const _needDebug = true;
            args.needDebug = _needDebug;
        } else {
            args.needDebug = false;
        }
        if (args.flags & (1 << 6)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _reason = reader.tgReadObject();
            args.reason = _reason;
        } else {
            args.reason = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _duration = reader.readInt();
            args.duration = _duration;
        } else {
            args.duration = undefined;
        }
        return new PhoneCallDiscarded(args);
    }
}