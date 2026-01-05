import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStickerSet } from "./TypeInputStickerSet";

export class DocumentAttributeCustomEmoji extends TLObject {
    static CONSTRUCTOR_ID = 4245985433;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeCustomEmoji";
    static classType = "constructor";

    flags!: number;
    free?: boolean;
    textColor?: boolean;
    alt!: string;
    stickerset!: TypeInputStickerSet;

    constructor(args: { flags?: number, free?: boolean, textColor?: boolean, alt?: string, stickerset?: TypeInputStickerSet } = {}) {
        super();
        this.flags = args.flags!;
        this.free = args.free;
        this.textColor = args.textColor;
        this.alt = args.alt!;
        this.stickerset = args.stickerset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4245985433, false);
        let flags = 0;
        if (this.free) { flags |= 1 << 0; }
        if (this.textColor) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.free !== undefined && this.free !== null) {
        }
        if (this.textColor !== undefined && this.textColor !== null) {
        }
        writer.tgWriteString(this.alt);
        writer.write(this.stickerset.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeCustomEmoji {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _free = true;
            args.free = _free;
        } else {
            args.free = false;
        }
        if (args.flags & (1 << 1)) {
            const _textColor = true;
            args.textColor = _textColor;
        } else {
            args.textColor = false;
        }
        const _alt = reader.tgReadString();
        args.alt = _alt;
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        return new DocumentAttributeCustomEmoji(args);
    }
}