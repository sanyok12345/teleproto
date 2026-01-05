import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoneCallDiscardReason } from "./TypePhoneCallDiscardReason";

export class MessageActionPhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 2162236031;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPhoneCall";
    static classType = "constructor";

    flags!: number;
    video?: boolean;
    callId!: bigint;
    reason?: TypePhoneCallDiscardReason;
    duration?: number;

    constructor(args: { flags?: number, video?: boolean, callId?: bigint, reason?: TypePhoneCallDiscardReason, duration?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.video = args.video;
        this.callId = args.callId!;
        this.reason = args.reason;
        this.duration = args.duration;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2162236031, false);
        let flags = 0;
        if (this.video) { flags |= 1 << 2; }
        if (this.reason !== undefined && this.reason !== null) { flags |= 1 << 0; }
        if (this.duration !== undefined && this.duration !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.video !== undefined && this.video !== null) {
        }
        writer.writeLargeInt(this.callId, 64);
        if (this.reason !== undefined && this.reason !== null) {
            writer.write(this.reason.getBytes());
        }
        if (this.duration !== undefined && this.duration !== null) {
            writer.writeInt(this.duration);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPhoneCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _callId = reader.readLargeInt(64);
        args.callId = _callId;
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
        return new MessageActionPhoneCall(args);
    }
}