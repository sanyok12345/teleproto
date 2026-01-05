import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotAppSettings extends TLObject {
    static CONSTRUCTOR_ID = 3382384976;
    static SUBCLASS_OF_ID = 396255971;
    static className = "BotAppSettings";
    static classType = "constructor";

    flags!: number;
    placeholderPath?: Buffer;
    backgroundColor?: number;
    backgroundDarkColor?: number;
    headerColor?: number;
    headerDarkColor?: number;

    constructor(args: { flags?: number, placeholderPath?: Buffer, backgroundColor?: number, backgroundDarkColor?: number, headerColor?: number, headerDarkColor?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.placeholderPath = args.placeholderPath;
        this.backgroundColor = args.backgroundColor;
        this.backgroundDarkColor = args.backgroundDarkColor;
        this.headerColor = args.headerColor;
        this.headerDarkColor = args.headerDarkColor;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3382384976, false);
        let flags = 0;
        if (this.placeholderPath !== undefined && this.placeholderPath !== null) { flags |= 1 << 0; }
        if (this.backgroundColor !== undefined && this.backgroundColor !== null) { flags |= 1 << 1; }
        if (this.backgroundDarkColor !== undefined && this.backgroundDarkColor !== null) { flags |= 1 << 2; }
        if (this.headerColor !== undefined && this.headerColor !== null) { flags |= 1 << 3; }
        if (this.headerDarkColor !== undefined && this.headerDarkColor !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.placeholderPath !== undefined && this.placeholderPath !== null) {
            writer.tgWriteBytes(this.placeholderPath);
        }
        if (this.backgroundColor !== undefined && this.backgroundColor !== null) {
            writer.writeInt(this.backgroundColor);
        }
        if (this.backgroundDarkColor !== undefined && this.backgroundDarkColor !== null) {
            writer.writeInt(this.backgroundDarkColor);
        }
        if (this.headerColor !== undefined && this.headerColor !== null) {
            writer.writeInt(this.headerColor);
        }
        if (this.headerDarkColor !== undefined && this.headerDarkColor !== null) {
            writer.writeInt(this.headerDarkColor);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotAppSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _placeholderPath = reader.tgReadBytes();
            args.placeholderPath = _placeholderPath;
        } else {
            args.placeholderPath = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _backgroundColor = reader.readInt();
            args.backgroundColor = _backgroundColor;
        } else {
            args.backgroundColor = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _backgroundDarkColor = reader.readInt();
            args.backgroundDarkColor = _backgroundDarkColor;
        } else {
            args.backgroundDarkColor = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _headerColor = reader.readInt();
            args.headerColor = _headerColor;
        } else {
            args.headerColor = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _headerDarkColor = reader.readInt();
            args.headerDarkColor = _headerDarkColor;
        } else {
            args.headerDarkColor = undefined;
        }
        return new BotAppSettings(args);
    }
}