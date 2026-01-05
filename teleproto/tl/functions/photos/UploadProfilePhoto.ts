import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputFile } from "../../types/TypeInputFile";
import { TypeVideoSize } from "../../types/TypeVideoSize";
import { TypePhoto } from "../../types/photos/TypePhoto";

export class UploadProfilePhoto extends MTProtoRequest {
    static CONSTRUCTOR_ID = 59286453;
    static SUBCLASS_OF_ID = 3264396580;
    static className = "photos.UploadProfilePhoto";
    static classType = "request";

    flags?: number;
    fallback?: boolean;
    bot?: EntityLike;
    file?: TypeInputFile;
    video?: TypeInputFile;
    videoStartTs?: number;
    videoEmojiMarkup?: TypeVideoSize;

    constructor(args: { flags?: number, fallback?: boolean, bot?: EntityLike, file?: TypeInputFile, video?: TypeInputFile, videoStartTs?: number, videoEmojiMarkup?: TypeVideoSize } = {}) {
        super();
        this.flags = args.flags;
        this.fallback = args.fallback;
        this.bot = args.bot;
        this.file = args.file;
        this.video = args.video;
        this.videoStartTs = args.videoStartTs;
        this.videoEmojiMarkup = args.videoEmojiMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(59286453, false);
        let flags = 0;
        if (this.fallback) { flags |= 1 << 3; }
        if (this.bot !== undefined && this.bot !== null) { flags |= 1 << 5; }
        if (this.file !== undefined && this.file !== null) { flags |= 1 << 0; }
        if (this.video !== undefined && this.video !== null) { flags |= 1 << 1; }
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) { flags |= 1 << 2; }
        if (this.videoEmojiMarkup !== undefined && this.videoEmojiMarkup !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.fallback !== undefined && this.fallback !== null) {
        }
        if (this.bot !== undefined && this.bot !== null) {
            writer.write((this.bot as any).getBytes());
        }
        if (this.file !== undefined && this.file !== null) {
            writer.write(this.file.getBytes());
        }
        if (this.video !== undefined && this.video !== null) {
            writer.write(this.video.getBytes());
        }
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) {
            writer.writeDouble(this.videoStartTs);
        }
        if (this.videoEmojiMarkup !== undefined && this.videoEmojiMarkup !== null) {
            writer.write(this.videoEmojiMarkup.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePhoto {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UploadProfilePhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _fallback = true;
            args.fallback = _fallback;
        } else {
            args.fallback = false;
        }
        if (args.flags & (1 << 5)) {
            const _bot = reader.tgReadObject();
            args.bot = _bot;
        } else {
            args.bot = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _file = reader.tgReadObject();
            args.file = _file;
        } else {
            args.file = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _video = reader.tgReadObject();
            args.video = _video;
        } else {
            args.video = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _videoStartTs = reader.readDouble();
            args.videoStartTs = _videoStartTs;
        } else {
            args.videoStartTs = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _videoEmojiMarkup = reader.tgReadObject();
            args.videoEmojiMarkup = _videoEmojiMarkup;
        } else {
            args.videoEmojiMarkup = undefined;
        }
        return new UploadProfilePhoto(args);
    }
}