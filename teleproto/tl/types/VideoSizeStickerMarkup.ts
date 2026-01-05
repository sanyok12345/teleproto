import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStickerSet } from "./TypeInputStickerSet";

export class VideoSizeStickerMarkup extends TLObject {
    static CONSTRUCTOR_ID = 228623102;
    static SUBCLASS_OF_ID = 1660015881;
    static className = "VideoSizeStickerMarkup";
    static classType = "constructor";

    stickerset!: TypeInputStickerSet;
    stickerId!: bigint;
    backgroundColors!: number[];

    constructor(args: { stickerset?: TypeInputStickerSet, stickerId?: bigint, backgroundColors?: number[] } = {}) {
        super();
        this.stickerset = args.stickerset!;
        this.stickerId = args.stickerId!;
        this.backgroundColors = args.backgroundColors!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(228623102, false);
        writer.write(this.stickerset.getBytes());
        writer.writeLargeInt(this.stickerId, 64);
        writer.writeVector(this.backgroundColors, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): VideoSizeStickerMarkup {
        const args: any = {};
        const _stickerset = reader.tgReadObject();
        args.stickerset = _stickerset;
        const _stickerId = reader.readLargeInt(64);
        args.stickerId = _stickerId;
        const _backgroundColors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.backgroundColors = _backgroundColors;
        return new VideoSizeStickerMarkup(args);
    }
}