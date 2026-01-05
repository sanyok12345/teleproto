import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";
import { TypeInputPhoto } from "./TypeInputPhoto";

export class InputMediaDocument extends TLObject {
    static CONSTRUCTOR_ID = 2826320565;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaDocument";
    static classType = "constructor";

    flags!: number;
    spoiler?: boolean;
    id!: TypeInputDocument;
    videoCover?: TypeInputPhoto;
    videoTimestamp?: number;
    ttlSeconds?: number;
    query?: string;

    constructor(args: { flags?: number, spoiler?: boolean, id?: TypeInputDocument, videoCover?: TypeInputPhoto, videoTimestamp?: number, ttlSeconds?: number, query?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.spoiler = args.spoiler;
        this.id = args.id!;
        this.videoCover = args.videoCover;
        this.videoTimestamp = args.videoTimestamp;
        this.ttlSeconds = args.ttlSeconds;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2826320565, false);
        let flags = 0;
        if (this.spoiler) { flags |= 1 << 2; }
        if (this.videoCover !== undefined && this.videoCover !== null) { flags |= 1 << 3; }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) { flags |= 1 << 4; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 0; }
        if (this.query !== undefined && this.query !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        writer.write(this.id.getBytes());
        if (this.videoCover !== undefined && this.videoCover !== null) {
            writer.write(this.videoCover.getBytes());
        }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) {
            writer.writeInt(this.videoTimestamp);
        }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        if (this.query !== undefined && this.query !== null) {
            writer.tgWriteString(this.query);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaDocument {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        const _id = reader.tgReadObject();
        args.id = _id;
        if (args.flags & (1 << 3)) {
            const _videoCover = reader.tgReadObject();
            args.videoCover = _videoCover;
        } else {
            args.videoCover = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _videoTimestamp = reader.readInt();
            args.videoTimestamp = _videoTimestamp;
        } else {
            args.videoTimestamp = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _query = reader.tgReadString();
            args.query = _query;
        } else {
            args.query = undefined;
        }
        return new InputMediaDocument(args);
    }
}