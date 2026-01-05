import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";
import { TypeWallPaperSettings } from "./TypeWallPaperSettings";

export class WallPaper extends TLObject {
    static CONSTRUCTOR_ID = 2755118061;
    static SUBCLASS_OF_ID = 2527250827;
    static className = "WallPaper";
    static classType = "constructor";

    id!: bigint;
    flags!: number;
    creator?: boolean;
    default?: boolean;
    pattern?: boolean;
    dark?: boolean;
    accessHash!: bigint;
    slug!: string;
    document!: TypeDocument;
    settings?: TypeWallPaperSettings;

    constructor(args: { id?: bigint, flags?: number, creator?: boolean, default?: boolean, pattern?: boolean, dark?: boolean, accessHash?: bigint, slug?: string, document?: TypeDocument, settings?: TypeWallPaperSettings } = {}) {
        super();
        this.id = args.id!;
        this.flags = args.flags!;
        this.creator = args.creator;
        this.default = args.default;
        this.pattern = args.pattern;
        this.dark = args.dark;
        this.accessHash = args.accessHash!;
        this.slug = args.slug!;
        this.document = args.document!;
        this.settings = args.settings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2755118061, false);
        let flags = 0;
        if (this.creator) { flags |= 1 << 0; }
        if (this.default) { flags |= 1 << 1; }
        if (this.pattern) { flags |= 1 << 3; }
        if (this.dark) { flags |= 1 << 4; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.default !== undefined && this.default !== null) {
        }
        if (this.pattern !== undefined && this.pattern !== null) {
        }
        if (this.dark !== undefined && this.dark !== null) {
        }
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteString(this.slug);
        writer.write(this.document.getBytes());
        if (this.settings !== undefined && this.settings !== null) {
            writer.write(this.settings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WallPaper {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 1)) {
            const _default = true;
            args.default = _default;
        } else {
            args.default = false;
        }
        if (args.flags & (1 << 3)) {
            const _pattern = true;
            args.pattern = _pattern;
        } else {
            args.pattern = false;
        }
        if (args.flags & (1 << 4)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _document = reader.tgReadObject();
        args.document = _document;
        if (args.flags & (1 << 2)) {
            const _settings = reader.tgReadObject();
            args.settings = _settings;
        } else {
            args.settings = undefined;
        }
        return new WallPaper(args);
    }
}