import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentAttributeVideo extends TLObject {
    static CONSTRUCTOR_ID = 1137015880;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeVideo";
    static classType = "constructor";

    flags!: number;
    roundMessage?: boolean;
    supportsStreaming?: boolean;
    nosound?: boolean;
    duration!: number;
    w!: number;
    h!: number;
    preloadPrefixSize?: number;
    videoStartTs?: number;
    videoCodec?: string;

    constructor(args: { flags?: number, roundMessage?: boolean, supportsStreaming?: boolean, nosound?: boolean, duration?: number, w?: number, h?: number, preloadPrefixSize?: number, videoStartTs?: number, videoCodec?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.roundMessage = args.roundMessage;
        this.supportsStreaming = args.supportsStreaming;
        this.nosound = args.nosound;
        this.duration = args.duration!;
        this.w = args.w!;
        this.h = args.h!;
        this.preloadPrefixSize = args.preloadPrefixSize;
        this.videoStartTs = args.videoStartTs;
        this.videoCodec = args.videoCodec;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1137015880, false);
        let flags = 0;
        if (this.roundMessage) { flags |= 1 << 0; }
        if (this.supportsStreaming) { flags |= 1 << 1; }
        if (this.nosound) { flags |= 1 << 3; }
        if (this.preloadPrefixSize !== undefined && this.preloadPrefixSize !== null) { flags |= 1 << 2; }
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) { flags |= 1 << 4; }
        if (this.videoCodec !== undefined && this.videoCodec !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.roundMessage !== undefined && this.roundMessage !== null) {
        }
        if (this.supportsStreaming !== undefined && this.supportsStreaming !== null) {
        }
        if (this.nosound !== undefined && this.nosound !== null) {
        }
        writer.writeDouble(this.duration);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        if (this.preloadPrefixSize !== undefined && this.preloadPrefixSize !== null) {
            writer.writeInt(this.preloadPrefixSize);
        }
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) {
            writer.writeDouble(this.videoStartTs);
        }
        if (this.videoCodec !== undefined && this.videoCodec !== null) {
            writer.tgWriteString(this.videoCodec);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeVideo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _roundMessage = true;
            args.roundMessage = _roundMessage;
        } else {
            args.roundMessage = false;
        }
        if (args.flags & (1 << 1)) {
            const _supportsStreaming = true;
            args.supportsStreaming = _supportsStreaming;
        } else {
            args.supportsStreaming = false;
        }
        if (args.flags & (1 << 3)) {
            const _nosound = true;
            args.nosound = _nosound;
        } else {
            args.nosound = false;
        }
        const _duration = reader.readDouble();
        args.duration = _duration;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        if (args.flags & (1 << 2)) {
            const _preloadPrefixSize = reader.readInt();
            args.preloadPrefixSize = _preloadPrefixSize;
        } else {
            args.preloadPrefixSize = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _videoStartTs = reader.readDouble();
            args.videoStartTs = _videoStartTs;
        } else {
            args.videoStartTs = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _videoCodec = reader.tgReadString();
            args.videoCodec = _videoCodec;
        } else {
            args.videoCodec = undefined;
        }
        return new DocumentAttributeVideo(args);
    }
}