import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AutoSaveSettings extends TLObject {
    static CONSTRUCTOR_ID = 3360175310;
    static SUBCLASS_OF_ID = 3443234534;
    static className = "AutoSaveSettings";
    static classType = "constructor";

    flags!: number;
    photos?: boolean;
    videos?: boolean;
    videoMaxSize?: bigint;

    constructor(args: { flags?: number, photos?: boolean, videos?: boolean, videoMaxSize?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.photos = args.photos;
        this.videos = args.videos;
        this.videoMaxSize = args.videoMaxSize;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3360175310, false);
        let flags = 0;
        if (this.photos) { flags |= 1 << 0; }
        if (this.videos) { flags |= 1 << 1; }
        if (this.videoMaxSize !== undefined && this.videoMaxSize !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.photos !== undefined && this.photos !== null) {
        }
        if (this.videos !== undefined && this.videos !== null) {
        }
        if (this.videoMaxSize !== undefined && this.videoMaxSize !== null) {
            writer.writeLargeInt(this.videoMaxSize, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AutoSaveSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _photos = true;
            args.photos = _photos;
        } else {
            args.photos = false;
        }
        if (args.flags & (1 << 1)) {
            const _videos = true;
            args.videos = _videos;
        } else {
            args.videos = false;
        }
        if (args.flags & (1 << 2)) {
            const _videoMaxSize = reader.readLargeInt(64);
            args.videoMaxSize = _videoMaxSize;
        } else {
            args.videoMaxSize = undefined;
        }
        return new AutoSaveSettings(args);
    }
}