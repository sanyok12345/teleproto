import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStickerSet } from "./TypeInputStickerSet";
import { TypeMaskCoords } from "./TypeMaskCoords";

export class DocumentAttributeSticker extends TLObject {
    static CONSTRUCTOR_ID = 1662637586;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeSticker";
    static classType = "constructor";

    flags!: number;
    mask?: boolean;
    alt!: string;
    stickerset!: TypeInputStickerSet;
    maskCoords?: TypeMaskCoords;

    constructor(args: { flags?: number, mask?: boolean, alt?: string, stickerset?: TypeInputStickerSet, maskCoords?: TypeMaskCoords } = {}) {
        super();
        this.flags = args.flags!;
        this.mask = args.mask;
        this.alt = args.alt!;
        this.stickerset = args.stickerset!;
        this.maskCoords = args.maskCoords;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1662637586, false);
        let flags = 0;
        if (this.mask) { flags |= 1 << 1; }
        if (this.maskCoords !== undefined && this.maskCoords !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.mask !== undefined && this.mask !== null) {
        }
        writer.tgWriteString(this.alt);
        writer.write(this.stickerset.getBytes());
        if (this.maskCoords !== undefined && this.maskCoords !== null) {
            writer.write(this.maskCoords.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeSticker {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _mask = true;
            args.mask = _mask;
        } else {
            args.mask = false;
        }
        const _alt = reader.tgReadString();
        args.alt = _alt;
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        if (args.flags & (1 << 0)) {
            const _maskCoords = reader.tgReadObject();
            args.maskCoords = _maskCoords;
        } else {
            args.maskCoords = undefined;
        }
        return new DocumentAttributeSticker(args);
    }
}