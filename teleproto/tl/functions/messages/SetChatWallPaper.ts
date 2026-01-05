import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputWallPaper } from "../../types/TypeInputWallPaper";
import { TypeWallPaperSettings } from "../../types/TypeWallPaperSettings";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SetChatWallPaper extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2415577825;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SetChatWallPaper";
    static classType = "request";

    flags?: number;
    forBoth?: boolean;
    revert?: boolean;
    peer?: EntityLike;
    wallpaper?: TypeInputWallPaper;
    settings?: TypeWallPaperSettings;
    id?: number;

    constructor(args: { flags?: number, forBoth?: boolean, revert?: boolean, peer?: EntityLike, wallpaper?: TypeInputWallPaper, settings?: TypeWallPaperSettings, id?: number } = {}) {
        super();
        this.flags = args.flags;
        this.forBoth = args.forBoth;
        this.revert = args.revert;
        this.peer = args.peer;
        this.wallpaper = args.wallpaper;
        this.settings = args.settings;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2415577825, false);
        let flags = 0;
        if (this.forBoth) { flags |= 1 << 3; }
        if (this.revert) { flags |= 1 << 4; }
        if (this.wallpaper !== undefined && this.wallpaper !== null) { flags |= 1 << 0; }
        if (this.settings !== undefined && this.settings !== null) { flags |= 1 << 2; }
        if (this.id !== undefined && this.id !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.forBoth !== undefined && this.forBoth !== null) {
        }
        if (this.revert !== undefined && this.revert !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.wallpaper !== undefined && this.wallpaper !== null) {
            writer.write(this.wallpaper.getBytes());
        }
        if (this.settings !== undefined && this.settings !== null) {
            writer.write(this.settings.getBytes());
        }
        if (this.id !== undefined && this.id !== null) {
            writer.writeInt(this.id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetChatWallPaper {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _forBoth = true;
            args.forBoth = _forBoth;
        } else {
            args.forBoth = false;
        }
        if (args.flags & (1 << 4)) {
            const _revert = true;
            args.revert = _revert;
        } else {
            args.revert = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _wallpaper = reader.tgReadObject();
            args.wallpaper = _wallpaper;
        } else {
            args.wallpaper = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _settings = reader.tgReadObject();
            args.settings = _settings;
        } else {
            args.settings = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _id = reader.readInt();
            args.id = _id;
        } else {
            args.id = undefined;
        }
        return new SetChatWallPaper(args);
    }
}