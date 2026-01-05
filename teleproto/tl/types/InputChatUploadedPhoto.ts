import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputFile } from "./TypeInputFile";
import { TypeVideoSize } from "./TypeVideoSize";

export class InputChatUploadedPhoto extends TLObject {
    static CONSTRUCTOR_ID = 3184373440;
    static SUBCLASS_OF_ID = 3572182388;
    static className = "InputChatUploadedPhoto";
    static classType = "constructor";

    flags!: number;
    file?: TypeInputFile;
    video?: TypeInputFile;
    videoStartTs?: number;
    videoEmojiMarkup?: TypeVideoSize;

    constructor(args: { flags?: number, file?: TypeInputFile, video?: TypeInputFile, videoStartTs?: number, videoEmojiMarkup?: TypeVideoSize } = {}) {
        super();
        this.flags = args.flags!;
        this.file = args.file;
        this.video = args.video;
        this.videoStartTs = args.videoStartTs;
        this.videoEmojiMarkup = args.videoEmojiMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3184373440, false);
        let flags = 0;
        if (this.file !== undefined && this.file !== null) { flags |= 1 << 0; }
        if (this.video !== undefined && this.video !== null) { flags |= 1 << 1; }
        if (this.videoStartTs !== undefined && this.videoStartTs !== null) { flags |= 1 << 2; }
        if (this.videoEmojiMarkup !== undefined && this.videoEmojiMarkup !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
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

    static fromReader(reader: BinaryReader): InputChatUploadedPhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
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
        if (args.flags & (1 << 3)) {
            const _videoEmojiMarkup = reader.tgReadObject();
            args.videoEmojiMarkup = _videoEmojiMarkup;
        } else {
            args.videoEmojiMarkup = undefined;
        }
        return new InputChatUploadedPhoto(args);
    }
}