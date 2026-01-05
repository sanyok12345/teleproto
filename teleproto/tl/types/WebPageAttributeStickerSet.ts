import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";

export class WebPageAttributeStickerSet extends TLObject {
    static CONSTRUCTOR_ID = 1355547603;
    static SUBCLASS_OF_ID = 2949638599;
    static className = "WebPageAttributeStickerSet";
    static classType = "constructor";

    flags!: number;
    emojis?: boolean;
    textColor?: boolean;
    stickers!: TypeDocument[];

    constructor(args: { flags?: number, emojis?: boolean, textColor?: boolean, stickers?: TypeDocument[] } = {}) {
        super();
        this.flags = args.flags!;
        this.emojis = args.emojis;
        this.textColor = args.textColor;
        this.stickers = args.stickers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1355547603, false);
        let flags = 0;
        if (this.emojis) { flags |= 1 << 0; }
        if (this.textColor) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        if (this.textColor !== undefined && this.textColor !== null) {
        }
        writer.writeVector(this.stickers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageAttributeStickerSet {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _emojis = true;
            args.emojis = _emojis;
        } else {
            args.emojis = false;
        }
        if (args.flags & (1 << 1)) {
            const _textColor = true;
            args.textColor = _textColor;
        } else {
            args.textColor = false;
        }
        const _stickers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stickers = _stickers;
        return new WebPageAttributeStickerSet(args);
    }
}