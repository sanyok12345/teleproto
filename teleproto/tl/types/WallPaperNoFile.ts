import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWallPaperSettings } from "./TypeWallPaperSettings";

export class WallPaperNoFile extends TLObject {
    static CONSTRUCTOR_ID = 3766501654;
    static SUBCLASS_OF_ID = 2527250827;
    static className = "WallPaperNoFile";
    static classType = "constructor";

    id!: bigint;
    flags!: number;
    default?: boolean;
    dark?: boolean;
    settings?: TypeWallPaperSettings;

    constructor(args: { id?: bigint, flags?: number, default?: boolean, dark?: boolean, settings?: TypeWallPaperSettings } = {}) {
        super();
        this.id = args.id!;
        this.flags = args.flags!;
        this.default = args.default;
        this.dark = args.dark;
        this.settings = args.settings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3766501654, false);
        let flags = 0;
        if (this.default) { flags |= 1 << 1; }
        if (this.dark) { flags |= 1 << 4; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        if (this.default !== undefined && this.default !== null) {
        }
        if (this.dark !== undefined && this.dark !== null) {
        }
        if (this.settings !== undefined && this.settings !== null) {
            writer.write(this.settings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WallPaperNoFile {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _default = true;
            args.default = _default;
        } else {
            args.default = false;
        }
        if (args.flags & (1 << 4)) {
            const _dark = true;
            args.dark = _dark;
        } else {
            args.dark = false;
        }
        if (args.flags & (1 << 2)) {
            const _settings = reader.tgReadObject();
            args.settings = _settings;
        } else {
            args.settings = undefined;
        }
        return new WallPaperNoFile(args);
    }
}