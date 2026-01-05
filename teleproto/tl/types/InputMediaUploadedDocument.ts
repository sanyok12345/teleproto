import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputFile } from "./TypeInputFile";
import { TypeDocumentAttribute } from "./TypeDocumentAttribute";
import { TypeInputDocument } from "./TypeInputDocument";
import { TypeInputPhoto } from "./TypeInputPhoto";

export class InputMediaUploadedDocument extends TLObject {
    static CONSTRUCTOR_ID = 58495792;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaUploadedDocument";
    static classType = "constructor";

    flags!: number;
    nosoundVideo?: boolean;
    forceFile?: boolean;
    spoiler?: boolean;
    file!: TypeInputFile;
    thumb?: TypeInputFile;
    mimeType!: string;
    attributes!: TypeDocumentAttribute[];
    stickers?: TypeInputDocument[];
    videoCover?: TypeInputPhoto;
    videoTimestamp?: number;
    ttlSeconds?: number;

    constructor(args: { flags?: number, nosoundVideo?: boolean, forceFile?: boolean, spoiler?: boolean, file?: TypeInputFile, thumb?: TypeInputFile, mimeType?: string, attributes?: TypeDocumentAttribute[], stickers?: TypeInputDocument[], videoCover?: TypeInputPhoto, videoTimestamp?: number, ttlSeconds?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nosoundVideo = args.nosoundVideo;
        this.forceFile = args.forceFile;
        this.spoiler = args.spoiler;
        this.file = args.file!;
        this.thumb = args.thumb;
        this.mimeType = args.mimeType!;
        this.attributes = args.attributes!;
        this.stickers = args.stickers;
        this.videoCover = args.videoCover;
        this.videoTimestamp = args.videoTimestamp;
        this.ttlSeconds = args.ttlSeconds;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(58495792, false);
        let flags = 0;
        if (this.nosoundVideo) { flags |= 1 << 3; }
        if (this.forceFile) { flags |= 1 << 4; }
        if (this.spoiler) { flags |= 1 << 5; }
        if (this.thumb !== undefined && this.thumb !== null) { flags |= 1 << 2; }
        if (this.stickers !== undefined && this.stickers !== null) { flags |= 1 << 0; }
        if (this.videoCover !== undefined && this.videoCover !== null) { flags |= 1 << 6; }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) { flags |= 1 << 7; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.nosoundVideo !== undefined && this.nosoundVideo !== null) {
        }
        if (this.forceFile !== undefined && this.forceFile !== null) {
        }
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        writer.write(this.file.getBytes());
        if (this.thumb !== undefined && this.thumb !== null) {
            writer.write(this.thumb.getBytes());
        }
        writer.tgWriteString(this.mimeType);
        writer.writeVector(this.attributes, (item) => {
            writer.write(item.getBytes());
        });
        if (this.stickers !== undefined && this.stickers !== null) {
            writer.writeVector(this.stickers, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.videoCover !== undefined && this.videoCover !== null) {
            writer.write(this.videoCover.getBytes());
        }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) {
            writer.writeInt(this.videoTimestamp);
        }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaUploadedDocument {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _nosoundVideo = true;
            args.nosoundVideo = _nosoundVideo;
        } else {
            args.nosoundVideo = false;
        }
        if (args.flags & (1 << 4)) {
            const _forceFile = true;
            args.forceFile = _forceFile;
        } else {
            args.forceFile = false;
        }
        if (args.flags & (1 << 5)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        const _file = reader.tgReadObject();
        args.file = _file;
        if (args.flags & (1 << 2)) {
            const _thumb = reader.tgReadObject();
            args.thumb = _thumb;
        } else {
            args.thumb = undefined;
        }
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        const _attributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.attributes = _attributes;
        if (args.flags & (1 << 0)) {
            const _stickers = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.stickers = _stickers;
        } else {
            args.stickers = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _videoCover = reader.tgReadObject();
            args.videoCover = _videoCover;
        } else {
            args.videoCover = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _videoTimestamp = reader.readInt();
            args.videoTimestamp = _videoTimestamp;
        } else {
            args.videoTimestamp = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        return new InputMediaUploadedDocument(args);
    }
}