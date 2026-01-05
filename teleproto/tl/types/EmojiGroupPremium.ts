import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiGroupPremium extends TLObject {
    static CONSTRUCTOR_ID = 154914612;
    static SUBCLASS_OF_ID = 1440784787;
    static className = "EmojiGroupPremium";
    static classType = "constructor";

    title!: string;
    iconEmojiId!: bigint;

    constructor(args: { title?: string, iconEmojiId?: bigint } = {}) {
        super();
        this.title = args.title!;
        this.iconEmojiId = args.iconEmojiId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(154914612, false);
        writer.tgWriteString(this.title);
        writer.writeLargeInt(this.iconEmojiId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGroupPremium {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _iconEmojiId = reader.readLargeInt(64);
        args.iconEmojiId = _iconEmojiId;
        return new EmojiGroupPremium(args);
    }
}