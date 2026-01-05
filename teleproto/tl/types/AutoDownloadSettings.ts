import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AutoDownloadSettings extends TLObject {
    static CONSTRUCTOR_ID = 3131405864;
    static SUBCLASS_OF_ID = 1361582535;
    static className = "AutoDownloadSettings";
    static classType = "constructor";

    flags!: number;
    disabled?: boolean;
    videoPreloadLarge?: boolean;
    audioPreloadNext?: boolean;
    phonecallsLessData?: boolean;
    storiesPreload?: boolean;
    photoSizeMax!: number;
    videoSizeMax!: bigint;
    fileSizeMax!: bigint;
    videoUploadMaxbitrate!: number;
    smallQueueActiveOperationsMax!: number;
    largeQueueActiveOperationsMax!: number;

    constructor(args: { flags?: number, disabled?: boolean, videoPreloadLarge?: boolean, audioPreloadNext?: boolean, phonecallsLessData?: boolean, storiesPreload?: boolean, photoSizeMax?: number, videoSizeMax?: bigint, fileSizeMax?: bigint, videoUploadMaxbitrate?: number, smallQueueActiveOperationsMax?: number, largeQueueActiveOperationsMax?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.disabled = args.disabled;
        this.videoPreloadLarge = args.videoPreloadLarge;
        this.audioPreloadNext = args.audioPreloadNext;
        this.phonecallsLessData = args.phonecallsLessData;
        this.storiesPreload = args.storiesPreload;
        this.photoSizeMax = args.photoSizeMax!;
        this.videoSizeMax = args.videoSizeMax!;
        this.fileSizeMax = args.fileSizeMax!;
        this.videoUploadMaxbitrate = args.videoUploadMaxbitrate!;
        this.smallQueueActiveOperationsMax = args.smallQueueActiveOperationsMax!;
        this.largeQueueActiveOperationsMax = args.largeQueueActiveOperationsMax!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3131405864, false);
        let flags = 0;
        if (this.disabled) { flags |= 1 << 0; }
        if (this.videoPreloadLarge) { flags |= 1 << 1; }
        if (this.audioPreloadNext) { flags |= 1 << 2; }
        if (this.phonecallsLessData) { flags |= 1 << 3; }
        if (this.storiesPreload) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.disabled !== undefined && this.disabled !== null) {
        }
        if (this.videoPreloadLarge !== undefined && this.videoPreloadLarge !== null) {
        }
        if (this.audioPreloadNext !== undefined && this.audioPreloadNext !== null) {
        }
        if (this.phonecallsLessData !== undefined && this.phonecallsLessData !== null) {
        }
        if (this.storiesPreload !== undefined && this.storiesPreload !== null) {
        }
        writer.writeInt(this.photoSizeMax);
        writer.writeLargeInt(this.videoSizeMax, 64);
        writer.writeLargeInt(this.fileSizeMax, 64);
        writer.writeInt(this.videoUploadMaxbitrate);
        writer.writeInt(this.smallQueueActiveOperationsMax);
        writer.writeInt(this.largeQueueActiveOperationsMax);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AutoDownloadSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _disabled = true;
            args.disabled = _disabled;
        } else {
            args.disabled = false;
        }
        if (args.flags & (1 << 1)) {
            const _videoPreloadLarge = true;
            args.videoPreloadLarge = _videoPreloadLarge;
        } else {
            args.videoPreloadLarge = false;
        }
        if (args.flags & (1 << 2)) {
            const _audioPreloadNext = true;
            args.audioPreloadNext = _audioPreloadNext;
        } else {
            args.audioPreloadNext = false;
        }
        if (args.flags & (1 << 3)) {
            const _phonecallsLessData = true;
            args.phonecallsLessData = _phonecallsLessData;
        } else {
            args.phonecallsLessData = false;
        }
        if (args.flags & (1 << 4)) {
            const _storiesPreload = true;
            args.storiesPreload = _storiesPreload;
        } else {
            args.storiesPreload = false;
        }
        const _photoSizeMax = reader.readInt();
        args.photoSizeMax = _photoSizeMax;
        const _videoSizeMax = reader.readLargeInt(64);
        args.videoSizeMax = _videoSizeMax;
        const _fileSizeMax = reader.readLargeInt(64);
        args.fileSizeMax = _fileSizeMax;
        const _videoUploadMaxbitrate = reader.readInt();
        args.videoUploadMaxbitrate = _videoUploadMaxbitrate;
        const _smallQueueActiveOperationsMax = reader.readInt();
        args.smallQueueActiveOperationsMax = _smallQueueActiveOperationsMax;
        const _largeQueueActiveOperationsMax = reader.readInt();
        args.largeQueueActiveOperationsMax = _largeQueueActiveOperationsMax;
        return new AutoDownloadSettings(args);
    }
}