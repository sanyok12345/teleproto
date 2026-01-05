import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageActionConferenceCall extends TLObject {
    static CONSTRUCTOR_ID = 805187450;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionConferenceCall";
    static classType = "constructor";

    flags!: number;
    missed?: boolean;
    active?: boolean;
    video?: boolean;
    callId!: bigint;
    duration?: number;
    otherParticipants?: TypePeer[];

    constructor(args: { flags?: number, missed?: boolean, active?: boolean, video?: boolean, callId?: bigint, duration?: number, otherParticipants?: TypePeer[] } = {}) {
        super();
        this.flags = args.flags!;
        this.missed = args.missed;
        this.active = args.active;
        this.video = args.video;
        this.callId = args.callId!;
        this.duration = args.duration;
        this.otherParticipants = args.otherParticipants;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(805187450, false);
        let flags = 0;
        if (this.missed) { flags |= 1 << 0; }
        if (this.active) { flags |= 1 << 1; }
        if (this.video) { flags |= 1 << 4; }
        if (this.duration !== undefined && this.duration !== null) { flags |= 1 << 2; }
        if (this.otherParticipants !== undefined && this.otherParticipants !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.missed !== undefined && this.missed !== null) {
        }
        if (this.active !== undefined && this.active !== null) {
        }
        if (this.video !== undefined && this.video !== null) {
        }
        writer.writeLargeInt(this.callId, 64);
        if (this.duration !== undefined && this.duration !== null) {
            writer.writeInt(this.duration);
        }
        if (this.otherParticipants !== undefined && this.otherParticipants !== null) {
            writer.writeVector(this.otherParticipants, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionConferenceCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _missed = true;
            args.missed = _missed;
        } else {
            args.missed = false;
        }
        if (args.flags & (1 << 1)) {
            const _active = true;
            args.active = _active;
        } else {
            args.active = false;
        }
        if (args.flags & (1 << 4)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _callId = reader.readLargeInt(64);
        args.callId = _callId;
        if (args.flags & (1 << 2)) {
            const _duration = reader.readInt();
            args.duration = _duration;
        } else {
            args.duration = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _otherParticipants = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.otherParticipants = _otherParticipants;
        } else {
            args.otherParticipants = undefined;
        }
        return new MessageActionConferenceCall(args);
    }
}