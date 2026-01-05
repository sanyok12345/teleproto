import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";
import { TypeThemeSettings } from "./TypeThemeSettings";

export class Theme extends TLObject {
    static CONSTRUCTOR_ID = 2685298646;
    static SUBCLASS_OF_ID = 1454688268;
    static className = "Theme";
    static classType = "constructor";

    flags!: number;
    creator?: boolean;
    default?: boolean;
    forChat?: boolean;
    id!: bigint;
    accessHash!: bigint;
    slug!: string;
    title!: string;
    document?: TypeDocument;
    settings?: TypeThemeSettings[];
    emoticon?: string;
    installsCount?: number;

    constructor(args: { flags?: number, creator?: boolean, default?: boolean, forChat?: boolean, id?: bigint, accessHash?: bigint, slug?: string, title?: string, document?: TypeDocument, settings?: TypeThemeSettings[], emoticon?: string, installsCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.creator = args.creator;
        this.default = args.default;
        this.forChat = args.forChat;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.slug = args.slug!;
        this.title = args.title!;
        this.document = args.document;
        this.settings = args.settings;
        this.emoticon = args.emoticon;
        this.installsCount = args.installsCount;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2685298646, false);
        let flags = 0;
        if (this.creator) { flags |= 1 << 0; }
        if (this.default) { flags |= 1 << 1; }
        if (this.forChat) { flags |= 1 << 5; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 2; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 3; }
        if (this.emoticon !== undefined && this.emoticon !== null) { flags |= 1 << 6; }
        if (this.installsCount !== undefined && this.installsCount !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.default !== undefined && this.default !== null) {
        }
        if (this.forChat !== undefined && this.forChat !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteString(this.slug);
        writer.tgWriteString(this.title);
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.settings !== undefined && this.settings !== null) {
            writer.writeVector(this.settings, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.emoticon !== undefined && this.emoticon !== null) {
            writer.tgWriteString(this.emoticon);
        }
        if (this.installsCount !== undefined && this.installsCount !== null) {
            writer.writeInt(this.installsCount);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Theme {
        const args: any = {};
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
        if (args.flags & (1 << 5)) {
            const _forChat = true;
            args.forChat = _forChat;
        } else {
            args.forChat = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 2)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _settings = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.settings = _settings;
        } else {
            args.settings = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _emoticon = reader.tgReadString();
            args.emoticon = _emoticon;
        } else {
            args.emoticon = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _installsCount = reader.readInt();
            args.installsCount = _installsCount;
        } else {
            args.installsCount = undefined;
        }
        return new Theme(args);
    }
}