import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBaseTheme } from "./TypeBaseTheme";
import { TypeInputWallPaper } from "./TypeInputWallPaper";
import { TypeWallPaperSettings } from "./TypeWallPaperSettings";

export class InputThemeSettings extends TLObject {
    static CONSTRUCTOR_ID = 2413711439;
    static SUBCLASS_OF_ID = 2201536642;
    static className = "InputThemeSettings";
    static classType = "constructor";

    flags!: number;
    messageColorsAnimated?: boolean;
    baseTheme!: TypeBaseTheme;
    accentColor!: number;
    outboxAccentColor?: number;
    messageColors?: number[];
    wallpaper?: TypeInputWallPaper;
    wallpaperSettings?: TypeWallPaperSettings;

    constructor(args: { flags?: number, messageColorsAnimated?: boolean, baseTheme?: TypeBaseTheme, accentColor?: number, outboxAccentColor?: number, messageColors?: number[], wallpaper?: TypeInputWallPaper, wallpaperSettings?: TypeWallPaperSettings } = {}) {
        super();
        this.flags = args.flags!;
        this.messageColorsAnimated = args.messageColorsAnimated;
        this.baseTheme = args.baseTheme!;
        this.accentColor = args.accentColor!;
        this.outboxAccentColor = args.outboxAccentColor;
        this.messageColors = args.messageColors;
        this.wallpaper = args.wallpaper;
        this.wallpaperSettings = args.wallpaperSettings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2413711439, false);
        let flags = 0;
        if (this.messageColorsAnimated) { flags |= 1 << 2; }
        if (this.outboxAccentColor !== undefined && this.outboxAccentColor !== null) { flags |= 1 << 3; }
        if (this.messageColors !== undefined && this.messageColors !== null) { flags |= 1 << 0; }
        if (this.wallpaper !== undefined && this.wallpaper !== null) { flags |= 1 << 1; }
        if (this.wallpaperSettings !== undefined && this.wallpaperSettings !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.messageColorsAnimated !== undefined && this.messageColorsAnimated !== null) {
        }
        writer.write(this.baseTheme.getBytes());
        writer.writeInt(this.accentColor);
        if (this.outboxAccentColor !== undefined && this.outboxAccentColor !== null) {
            writer.writeInt(this.outboxAccentColor);
        }
        if (this.messageColors !== undefined && this.messageColors !== null) {
            writer.writeVector(this.messageColors, (item) => {
                writer.writeInt(item);
            });
        }
        if (this.wallpaper !== undefined && this.wallpaper !== null) {
            writer.write(this.wallpaper.getBytes());
        }
        if (this.wallpaperSettings !== undefined && this.wallpaperSettings !== null) {
            writer.write(this.wallpaperSettings.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputThemeSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _messageColorsAnimated = true;
            args.messageColorsAnimated = _messageColorsAnimated;
        } else {
            args.messageColorsAnimated = false;
        }
        const _baseTheme = reader.tgReadObject();
        args.baseTheme = _baseTheme;
        const _accentColor = reader.readInt();
        args.accentColor = _accentColor;
        if (args.flags & (1 << 3)) {
            const _outboxAccentColor = reader.readInt();
            args.outboxAccentColor = _outboxAccentColor;
        } else {
            args.outboxAccentColor = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _messageColors = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.messageColors = _messageColors;
        } else {
            args.messageColors = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _wallpaper = reader.tgReadObject();
            args.wallpaper = _wallpaper;
        } else {
            args.wallpaper = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _wallpaperSettings = reader.tgReadObject();
            args.wallpaperSettings = _wallpaperSettings;
        } else {
            args.wallpaperSettings = undefined;
        }
        return new InputThemeSettings(args);
    }
}