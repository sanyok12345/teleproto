import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypeDocument } from "./TypeDocument";

export class StoryAlbum extends TLObject {
    static CONSTRUCTOR_ID = 2468704346;
    static SUBCLASS_OF_ID = 2089574050;
    static className = "StoryAlbum";
    static classType = "constructor";

    flags!: number;
    albumId!: number;
    title!: string;
    iconPhoto?: TypePhoto;
    iconVideo?: TypeDocument;

    constructor(args: { flags?: number, albumId?: number, title?: string, iconPhoto?: TypePhoto, iconVideo?: TypeDocument } = {}) {
        super();
        this.flags = args.flags!;
        this.albumId = args.albumId!;
        this.title = args.title!;
        this.iconPhoto = args.iconPhoto;
        this.iconVideo = args.iconVideo;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2468704346, false);
        let flags = 0;
        if (this.iconPhoto !== undefined && this.iconPhoto !== null) { flags |= 1 << 0; }
        if (this.iconVideo !== undefined && this.iconVideo !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeInt(this.albumId);
        writer.tgWriteString(this.title);
        if (this.iconPhoto !== undefined && this.iconPhoto !== null) {
            writer.write(this.iconPhoto.getBytes());
        }
        if (this.iconVideo !== undefined && this.iconVideo !== null) {
            writer.write(this.iconVideo.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryAlbum {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _albumId = reader.readInt();
        args.albumId = _albumId;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 0)) {
            const _iconPhoto = reader.tgReadObject();
            args.iconPhoto = _iconPhoto;
        } else {
            args.iconPhoto = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _iconVideo = reader.tgReadObject();
            args.iconVideo = _iconVideo;
        } else {
            args.iconVideo = undefined;
        }
        return new StoryAlbum(args);
    }
}