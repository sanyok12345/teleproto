import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class VideoSize extends TLObject {
    static CONSTRUCTOR_ID = 3727929492;
    static SUBCLASS_OF_ID = 1660015881;
    static className = "VideoSize";
    static classType = "constructor";

    flags!: number;
    type!: string;
    w!: number;
    h!: number;
    size!: number;
    videoStartTs?: number;

    constructor(args: { flags?: number, type?: string, w?: number, h?: number, size?: number, videoStartTs?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.type = args.type!;
        this.w = args.w!;
        this.h = args.h!;
        this.size = args.size!;
        this.videoStartTs = args.videoStartTs;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3727929492, false);
        let flags = 0;
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.type);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        writer.writeInt(this.size);
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) {
            writer.writeDouble(this.videoStartTs);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): VideoSize {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _type = reader.tgReadString();
        args.type = _type;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        const _size = reader.readInt();
        args.size = _size;
        if (args.flags & (1 << 0)) {
            const _videoStartTs = reader.readDouble();
            args.videoStartTs = _videoStartTs;
        } else {
            args.videoStartTs = undefined;
        }
        return new VideoSize(args);
    }
}