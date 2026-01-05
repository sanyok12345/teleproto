import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhotoSize } from "./TypePhotoSize";
import { TypeVideoSize } from "./TypeVideoSize";
import { TypeDocumentAttribute } from "./TypeDocumentAttribute";

export class Document extends TLObject {
    static CONSTRUCTOR_ID = 2413085912;
    static SUBCLASS_OF_ID = 555739168;
    static className = "Document";
    static classType = "constructor";

    flags!: number;
    id!: bigint;
    accessHash!: bigint;
    fileReference!: Buffer;
    date!: number;
    mimeType!: string;
    size!: bigint;
    thumbs?: TypePhotoSize[];
    videoThumbs?: TypeVideoSize[];
    dcId!: number;
    attributes!: TypeDocumentAttribute[];

    constructor(args: { flags?: number, id?: bigint, accessHash?: bigint, fileReference?: Buffer, date?: number, mimeType?: string, size?: bigint, thumbs?: TypePhotoSize[], videoThumbs?: TypeVideoSize[], dcId?: number, attributes?: TypeDocumentAttribute[] } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.fileReference = args.fileReference!;
        this.date = args.date!;
        this.mimeType = args.mimeType!;
        this.size = args.size!;
        this.thumbs = args.thumbs;
        this.videoThumbs = args.videoThumbs;
        this.dcId = args.dcId!;
        this.attributes = args.attributes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2413085912, false);
        let flags = 0;
        if (this.thumbs !== undefined && this.thumbs !== null) { flags |= 1 << 0; }
        if (this.videoThumbs !== undefined && this.videoThumbs !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteBytes(this.fileReference);
        writer.writeInt(this.date);
        writer.tgWriteString(this.mimeType);
        writer.writeLargeInt(this.size, 64);
        if (this.thumbs !== undefined && this.thumbs !== null) {
            writer.writeVector(this.thumbs, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.videoThumbs !== undefined && this.videoThumbs !== null) {
            writer.writeVector(this.videoThumbs, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeInt(this.dcId);
        writer.writeVector(this.attributes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Document {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _fileReference = reader.tgReadBytes();
        args.fileReference = _fileReference;
        const _date = reader.readInt();
        args.date = _date;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        const _size = reader.readLargeInt(64);
        args.size = _size;
        if (args.flags & (1 << 0)) {
            const _thumbs = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.thumbs = _thumbs;
        } else {
            args.thumbs = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _videoThumbs = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.videoThumbs = _videoThumbs;
        } else {
            args.videoThumbs = undefined;
        }
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _attributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.attributes = _attributes;
        return new Document(args);
    }
}