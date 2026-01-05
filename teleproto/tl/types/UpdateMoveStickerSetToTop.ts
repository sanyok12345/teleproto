import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateMoveStickerSetToTop extends TLObject {
    static CONSTRUCTOR_ID = 2264715141;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateMoveStickerSetToTop";
    static classType = "constructor";

    flags!: number;
    masks?: boolean;
    emojis?: boolean;
    stickerset!: bigint;

    constructor(args: { flags?: number, masks?: boolean, emojis?: boolean, stickerset?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.masks = args.masks;
        this.emojis = args.emojis;
        this.stickerset = args.stickerset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2264715141, false);
        let flags = 0;
        if (this.masks) { flags |= 1 << 0; }
        if (this.emojis) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.masks !== undefined && this.masks !== null) {
        }
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        writer.writeLargeInt(this.stickerset, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateMoveStickerSetToTop {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _masks = true;
            args.masks = _masks;
        } else {
            args.masks = false;
        }
        if (args.flags & (1 << 1)) {
            const _emojis = true;
            args.emojis = _emojis;
        } else {
            args.emojis = false;
        }
        const _stickerset = reader.readLargeInt(64);
        args.stickerset = _stickerset;
        return new UpdateMoveStickerSetToTop(args);
    }
}