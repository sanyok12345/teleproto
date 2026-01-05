import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputFile } from "./TypeInputFile";
import { TypeInputDocument } from "./TypeInputDocument";

export class InputMediaUploadedPhoto extends TLObject {
    static CONSTRUCTOR_ID = 505969924;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaUploadedPhoto";
    static classType = "constructor";

    flags!: number;
    spoiler?: boolean;
    file!: TypeInputFile;
    stickers?: TypeInputDocument[];
    ttlSeconds?: number;

    constructor(args: { flags?: number, spoiler?: boolean, file?: TypeInputFile, stickers?: TypeInputDocument[], ttlSeconds?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.spoiler = args.spoiler;
        this.file = args.file!;
        this.stickers = args.stickers;
        this.ttlSeconds = args.ttlSeconds;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(505969924, false);
        let flags = 0;
        if (this.spoiler) { flags |= 1 << 2; }
        if (this.stickers !== undefined && this.stickers !== null) { flags |= 1 << 0; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        writer.write(this.file.getBytes());
        if (this.stickers !== undefined && this.stickers !== null) {
            writer.writeVector(this.stickers, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaUploadedPhoto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        const _file = reader.tgReadObject();
        args.file = _file;
        if (args.flags & (1 << 0)) {
            const _stickers = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.stickers = _stickers;
        } else {
            args.stickers = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        return new InputMediaUploadedPhoto(args);
    }
}