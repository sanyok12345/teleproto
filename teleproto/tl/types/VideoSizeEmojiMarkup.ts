import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class VideoSizeEmojiMarkup extends TLObject {
    static CONSTRUCTOR_ID = 4166795580;
    static SUBCLASS_OF_ID = 1660015881;
    static className = "VideoSizeEmojiMarkup";
    static classType = "constructor";

    emojiId!: bigint;
    backgroundColors!: number[];

    constructor(args: { emojiId?: bigint, backgroundColors?: number[] } = {}) {
        super();
        this.emojiId = args.emojiId!;
        this.backgroundColors = args.backgroundColors!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4166795580, false);
        writer.writeLargeInt(this.emojiId, 64);
        writer.writeVector(this.backgroundColors, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): VideoSizeEmojiMarkup {
        const args: any = {};
        const _emojiId = reader.readLargeInt(64);
        args.emojiId = _emojiId;
        const _backgroundColors = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.backgroundColors = _backgroundColors;
        return new VideoSizeEmojiMarkup(args);
    }
}