import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockVideo extends TLObject {
    static CONSTRUCTOR_ID = 2089805750;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockVideo";
    static classType = "constructor";

    flags!: number;
    autoplay?: boolean;
    loop?: boolean;
    videoId!: bigint;
    caption!: TypePageCaption;

    constructor(args: { flags?: number, autoplay?: boolean, loop?: boolean, videoId?: bigint, caption?: TypePageCaption } = {}) {
        super();
        this.flags = args.flags!;
        this.autoplay = args.autoplay;
        this.loop = args.loop;
        this.videoId = args.videoId!;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2089805750, false);
        let flags = 0;
        if (this.autoplay) { flags |= 1 << 0; }
        if (this.loop) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.autoplay !== undefined && this.autoplay !== null) {
        }
        if (this.loop !== undefined && this.loop !== null) {
        }
        writer.writeLargeInt(this.videoId, 64);
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockVideo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _autoplay = true;
            args.autoplay = _autoplay;
        } else {
            args.autoplay = false;
        }
        if (args.flags & (1 << 1)) {
            const _loop = true;
            args.loop = _loop;
        } else {
            args.loop = false;
        }
        const _videoId = reader.readLargeInt(64);
        args.videoId = _videoId;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockVideo(args);
    }
}