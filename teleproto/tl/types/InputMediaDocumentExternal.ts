import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPhoto } from "./TypeInputPhoto";

export class InputMediaDocumentExternal extends TLObject {
    static CONSTRUCTOR_ID = 2006319353;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaDocumentExternal";
    static classType = "constructor";

    flags!: number;
    spoiler?: boolean;
    url!: string;
    ttlSeconds?: number;
    videoCover?: TypeInputPhoto;
    videoTimestamp?: number;

    constructor(args: { flags?: number, spoiler?: boolean, url?: string, ttlSeconds?: number, videoCover?: TypeInputPhoto, videoTimestamp?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.spoiler = args.spoiler;
        this.url = args.url!;
        this.ttlSeconds = args.ttlSeconds;
        this.videoCover = args.videoCover;
        this.videoTimestamp = args.videoTimestamp;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2006319353, false);
        let flags = 0;
        if (this.spoiler) { flags |= 1 << 1; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 0; }
        if (this.videoCover !== undefined && this.videoCover !== null) { flags |= 1 << 2; }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        writer.tgWriteString(this.url);
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        if (this.videoCover !== undefined && this.videoCover !== null) {
            writer.write(this.videoCover.getBytes());
        }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) {
            writer.writeInt(this.videoTimestamp);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaDocumentExternal {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        if (args.flags & (1 << 0)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _videoCover = reader.tgReadObject();
            args.videoCover = _videoCover;
        } else {
            args.videoCover = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _videoTimestamp = reader.readInt();
            args.videoTimestamp = _videoTimestamp;
        } else {
            args.videoTimestamp = undefined;
        }
        return new InputMediaDocumentExternal(args);
    }
}