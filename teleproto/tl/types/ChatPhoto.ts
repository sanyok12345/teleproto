import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatPhoto extends TLObject {
    static CONSTRUCTOR_ID = 476978193;
    static SUBCLASS_OF_ID = 2889794789;
    static className = "ChatPhoto";
    static classType = "constructor";

    flags!: number;
    hasVideo?: boolean;
    photoId!: bigint;
    strippedThumb?: Buffer;
    dcId!: number;

    constructor(args: { flags?: number, hasVideo?: boolean, photoId?: bigint, strippedThumb?: Buffer, dcId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.hasVideo = args.hasVideo;
        this.photoId = args.photoId!;
        this.strippedThumb = args.strippedThumb;
        this.dcId = args.dcId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(476978193, false);
        let flags = 0;
        if (this.hasVideo) { flags |= 1 << 0; }
        if (this.strippedThumb !== undefined && this.strippedThumb !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.hasVideo !== undefined && this.hasVideo !== null) {
        }
        writer.writeLargeInt(this.photoId, 64);
        if (this.strippedThumb !== undefined && this.strippedThumb !== null) {
            writer.tgWriteBytes(this.strippedThumb);
        }
        writer.writeInt(this.dcId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatPhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hasVideo = true;
            args.hasVideo = _hasVideo;
        } else {
            args.hasVideo = false;
        }
        const _photoId = reader.readLargeInt(64);
        args.photoId = _photoId;
        if (args.flags & (1 << 1)) {
            const _strippedThumb = reader.tgReadBytes();
            args.strippedThumb = _strippedThumb;
        } else {
            args.strippedThumb = undefined;
        }
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        return new ChatPhoto(args);
    }
}