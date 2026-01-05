import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class InputGroupCallStream extends TLObject {
    static CONSTRUCTOR_ID = 93890858;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputGroupCallStream";
    static classType = "constructor";

    flags!: number;
    call!: TypeInputGroupCall;
    timeMs!: bigint;
    scale!: number;
    videoChannel?: number;
    videoQuality?: number;

    constructor(args: { flags?: number, call?: TypeInputGroupCall, timeMs?: bigint, scale?: number, videoChannel?: number, videoQuality?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.call = args.call!;
        this.timeMs = args.timeMs!;
        this.scale = args.scale!;
        this.videoChannel = args.videoChannel;
        this.videoQuality = args.videoQuality;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(93890858, false);
        let flags = 0;
        if (this.videoChannel !== undefined && this.videoChannel !== null) { flags |= 1 << 0; }
        if (this.videoQuality !== undefined && this.videoQuality !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.call.getBytes());
        writer.writeLargeInt(this.timeMs, 64);
        writer.writeInt(this.scale);
        if (this.videoChannel !== undefined && this.videoChannel !== null) {
            writer.writeInt(this.videoChannel);
        }
        if (this.videoQuality !== undefined && this.videoQuality !== null) {
            writer.writeInt(this.videoQuality);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputGroupCallStream {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _call = reader.tgReadObject();
        args.call = _call;
        const _timeMs = reader.readLargeInt(64);
        args.timeMs = _timeMs;
        const _scale = reader.readInt();
        args.scale = _scale;
        if (args.flags & (1 << 0)) {
            const _videoChannel = reader.readInt();
            args.videoChannel = _videoChannel;
        } else {
            args.videoChannel = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _videoQuality = reader.readInt();
            args.videoQuality = _videoQuality;
        } else {
            args.videoQuality = undefined;
        }
        return new InputGroupCallStream(args);
    }
}