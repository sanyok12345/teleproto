import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class WallPaperSettings extends TLObject {
    static CONSTRUCTOR_ID = 925826256;
    static SUBCLASS_OF_ID = 1098244882;
    static className = "WallPaperSettings";
    static classType = "constructor";

    flags!: number;
    blur?: boolean;
    motion?: boolean;
    backgroundColor?: number;
    secondBackgroundColor?: number;
    thirdBackgroundColor?: number;
    fourthBackgroundColor?: number;
    intensity?: number;
    rotation?: number;
    emoticon?: string;

    constructor(args: { flags?: number, blur?: boolean, motion?: boolean, backgroundColor?: number, secondBackgroundColor?: number, thirdBackgroundColor?: number, fourthBackgroundColor?: number, intensity?: number, rotation?: number, emoticon?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.blur = args.blur;
        this.motion = args.motion;
        this.backgroundColor = args.backgroundColor;
        this.secondBackgroundColor = args.secondBackgroundColor;
        this.thirdBackgroundColor = args.thirdBackgroundColor;
        this.fourthBackgroundColor = args.fourthBackgroundColor;
        this.intensity = args.intensity;
        this.rotation = args.rotation;
        this.emoticon = args.emoticon;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(925826256, false);
        let flags = 0;
        if (this.blur) { flags |= 1 << 1; }
        if (this.motion) { flags |= 1 << 2; }
        if (this.backgroundColor !== undefined && this.backgroundColor !== null) { flags |= 1 << 0; }
        if (this.secondBackgroundColor !== undefined && this.secondBackgroundColor !== null) { flags |= 1 << 4; }
        if (this.thirdBackgroundColor !== undefined && this.thirdBackgroundColor !== null) { flags |= 1 << 5; }
        if (this.fourthBackgroundColor !== undefined && this.fourthBackgroundColor !== null) { flags |= 1 << 6; }
        if (this.intensity !== undefined && this.intensity !== null) { flags |= 1 << 3; }
        if (this.rotation !== undefined && this.rotation !== null) { flags |= 1 << 4; }
        if (this.emoticon !== undefined && this.emoticon !== null) { flags |= 1 << 7; }
        writer.writeInt(flags, false);
        if (this.blur !== undefined && this.blur !== null) {
        }
        if (this.motion !== undefined && this.motion !== null) {
        }
        if (this.backgroundColor !== undefined && this.backgroundColor !== null) {
            writer.writeInt(this.backgroundColor);
        }
        if (this.secondBackgroundColor !== undefined && this.secondBackgroundColor !== null) {
            writer.writeInt(this.secondBackgroundColor);
        }
        if (this.thirdBackgroundColor !== undefined && this.thirdBackgroundColor !== null) {
            writer.writeInt(this.thirdBackgroundColor);
        }
        if (this.fourthBackgroundColor !== undefined && this.fourthBackgroundColor !== null) {
            writer.writeInt(this.fourthBackgroundColor);
        }
        if (this.intensity !== undefined && this.intensity !== null) {
            writer.writeInt(this.intensity);
        }
        if (this.rotation !== undefined && this.rotation !== null) {
            writer.writeInt(this.rotation);
        }
        if (this.emoticon !== undefined && this.emoticon !== null) {
            writer.tgWriteString(this.emoticon);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WallPaperSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _blur = true;
            args.blur = _blur;
        } else {
            args.blur = false;
        }
        if (args.flags & (1 << 2)) {
            const _motion = true;
            args.motion = _motion;
        } else {
            args.motion = false;
        }
        if (args.flags & (1 << 0)) {
            const _backgroundColor = reader.readInt();
            args.backgroundColor = _backgroundColor;
        } else {
            args.backgroundColor = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _secondBackgroundColor = reader.readInt();
            args.secondBackgroundColor = _secondBackgroundColor;
        } else {
            args.secondBackgroundColor = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _thirdBackgroundColor = reader.readInt();
            args.thirdBackgroundColor = _thirdBackgroundColor;
        } else {
            args.thirdBackgroundColor = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _fourthBackgroundColor = reader.readInt();
            args.fourthBackgroundColor = _fourthBackgroundColor;
        } else {
            args.fourthBackgroundColor = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _intensity = reader.readInt();
            args.intensity = _intensity;
        } else {
            args.intensity = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _rotation = reader.readInt();
            args.rotation = _rotation;
        } else {
            args.rotation = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _emoticon = reader.tgReadString();
            args.emoticon = _emoticon;
        } else {
            args.emoticon = undefined;
        }
        return new WallPaperSettings(args);
    }
}