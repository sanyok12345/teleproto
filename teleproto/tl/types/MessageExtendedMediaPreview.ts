import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhotoSize } from "./TypePhotoSize";

export class MessageExtendedMediaPreview extends TLObject {
    static CONSTRUCTOR_ID = 2908916936;
    static SUBCLASS_OF_ID = 2535971165;
    static className = "MessageExtendedMediaPreview";
    static classType = "constructor";

    flags!: number;
    w?: number;
    h?: number;
    thumb?: TypePhotoSize;
    videoDuration?: number;

    constructor(args: { flags?: number, w?: number, h?: number, thumb?: TypePhotoSize, videoDuration?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.w = args.w;
        this.h = args.h;
        this.thumb = args.thumb;
        this.videoDuration = args.videoDuration;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2908916936, false);
        let flags = 0;
        if (this.w !== undefined && this.w !== null) { flags |= 1 << 0; }
        if (this.h !== undefined && this.h !== null) { flags |= 1 << 0; }
        if (this.thumb !== undefined && this.thumb !== null) { flags |= 1 << 1; }
        if (this.videoDuration !== undefined && this.videoDuration !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.w !== undefined && this.w !== null) {
            writer.writeInt(this.w);
        }
        if (this.h !== undefined && this.h !== null) {
            writer.writeInt(this.h);
        }
        if (this.thumb !== undefined && this.thumb !== null) {
            writer.write(this.thumb.getBytes());
        }
        if (this.videoDuration !== undefined && this.videoDuration !== null) {
            writer.writeInt(this.videoDuration);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageExtendedMediaPreview {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _w = reader.readInt();
            args.w = _w;
        } else {
            args.w = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _h = reader.readInt();
            args.h = _h;
        } else {
            args.h = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _thumb = reader.tgReadObject();
            args.thumb = _thumb;
        } else {
            args.thumb = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _videoDuration = reader.readInt();
            args.videoDuration = _videoDuration;
        } else {
            args.videoDuration = undefined;
        }
        return new MessageExtendedMediaPreview(args);
    }
}