import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerColorCollectible extends TLObject {
    static CONSTRUCTOR_ID = 3116393370;
    static SUBCLASS_OF_ID = 4068582527;
    static className = "PeerColorCollectible";
    static classType = "constructor";

    flags!: number;
    collectibleId!: bigint;
    giftEmojiId!: bigint;
    backgroundEmojiId!: bigint;
    accentColor!: number;
    colors!: number[];
    darkAccentColor?: number;
    darkColors?: number[];

    constructor(args: { flags?: number, collectibleId?: bigint, giftEmojiId?: bigint, backgroundEmojiId?: bigint, accentColor?: number, colors?: number[], darkAccentColor?: number, darkColors?: number[] } = {}) {
        super();
        this.flags = args.flags!;
        this.collectibleId = args.collectibleId!;
        this.giftEmojiId = args.giftEmojiId!;
        this.backgroundEmojiId = args.backgroundEmojiId!;
        this.accentColor = args.accentColor!;
        this.colors = args.colors!;
        this.darkAccentColor = args.darkAccentColor;
        this.darkColors = args.darkColors;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3116393370, false);
        let flags = 0;
        if (this.darkAccentColor !== undefined && this.darkAccentColor !== null) { flags |= 1 << 0; }
        if (this.darkColors !== undefined && this.darkColors !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.collectibleId, 64);
        writer.writeLargeInt(this.giftEmojiId, 64);
        writer.writeLargeInt(this.backgroundEmojiId, 64);
        writer.writeInt(this.accentColor);
        writer.writeVector(this.colors, (item) => {
            writer.writeInt(item);
        });
        if (this.darkAccentColor !== undefined && this.darkAccentColor !== null) {
            writer.writeInt(this.darkAccentColor);
        }
        if (this.darkColors !== undefined && this.darkColors !== null) {
            writer.writeVector(this.darkColors, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColorCollectible {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _collectibleId = reader.readLargeInt(64);
        args.collectibleId = _collectibleId;
        const _giftEmojiId = reader.readLargeInt(64);
        args.giftEmojiId = _giftEmojiId;
        const _backgroundEmojiId = reader.readLargeInt(64);
        args.backgroundEmojiId = _backgroundEmojiId;
        const _accentColor = reader.readInt();
        args.accentColor = _accentColor;
        const _colors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.colors = _colors;
        if (args.flags & (1 << 0)) {
            const _darkAccentColor = reader.readInt();
            args.darkAccentColor = _darkAccentColor;
        } else {
            args.darkAccentColor = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _darkColors = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.darkColors = _darkColors;
        } else {
            args.darkColors = undefined;
        }
        return new PeerColorCollectible(args);
    }
}