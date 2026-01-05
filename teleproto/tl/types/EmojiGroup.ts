import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiGroup extends TLObject {
    static CONSTRUCTOR_ID = 2056961449;
    static SUBCLASS_OF_ID = 1440784787;
    static className = "EmojiGroup";
    static classType = "constructor";

    title!: string;
    iconEmojiId!: bigint;
    emoticons!: string[];

    constructor(args: { title?: string, iconEmojiId?: bigint, emoticons?: string[] } = {}) {
        super();
        this.title = args.title!;
        this.iconEmojiId = args.iconEmojiId!;
        this.emoticons = args.emoticons!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2056961449, false);
        writer.tgWriteString(this.title);
        writer.writeLargeInt(this.iconEmojiId, 64);
        writer.writeVector(this.emoticons, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGroup {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _iconEmojiId = reader.readLargeInt(64);
        args.iconEmojiId = _iconEmojiId;
        const _emoticons = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.emoticons = _emoticons;
        return new EmojiGroup(args);
    }
}