import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhotoSize } from "./TypePhotoSize";
import { TypeVideoSize } from "./TypeVideoSize";

export class Photo extends TLObject {
    static CONSTRUCTOR_ID = 4212750949;
    static SUBCLASS_OF_ID = 3581324060;
    static className = "Photo";
    static classType = "constructor";

    flags!: number;
    hasStickers?: boolean;
    id!: bigint;
    accessHash!: bigint;
    fileReference!: Buffer;
    date!: number;
    sizes!: TypePhotoSize[];
    videoSizes?: TypeVideoSize[];
    dcId!: number;

    constructor(args: { flags?: number, hasStickers?: boolean, id?: bigint, accessHash?: bigint, fileReference?: Buffer, date?: number, sizes?: TypePhotoSize[], videoSizes?: TypeVideoSize[], dcId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.hasStickers = args.hasStickers;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.fileReference = args.fileReference!;
        this.date = args.date!;
        this.sizes = args.sizes!;
        this.videoSizes = args.videoSizes;
        this.dcId = args.dcId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4212750949, false);
        let flags = 0;
        if (this.hasStickers) { flags |= 1 << 0; }
        if (this.videoSizes !== undefined && this.videoSizes !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.hasStickers !== undefined && this.hasStickers !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteBytes(this.fileReference);
        writer.writeInt(this.date);
        writer.writeVector(this.sizes, (item) => {
            writer.write(item.getBytes());
        });
        if (this.videoSizes !== undefined && this.videoSizes !== null) {
            writer.writeVector(this.videoSizes, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeInt(this.dcId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Photo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hasStickers = true;
            args.hasStickers = _hasStickers;
        } else {
            args.hasStickers = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _fileReference = reader.tgReadBytes();
        args.fileReference = _fileReference;
        const _date = reader.readInt();
        args.date = _date;
        const _sizes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sizes = _sizes;
        if (args.flags & (1 << 1)) {
            const _videoSizes = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.videoSizes = _videoSizes;
        } else {
            args.videoSizes = undefined;
        }
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        return new Photo(args);
    }
}