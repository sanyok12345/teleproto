import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionTopicCreate extends TLObject {
    static CONSTRUCTOR_ID = 228168278;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionTopicCreate";
    static classType = "constructor";

    flags!: number;
    titleMissing?: boolean;
    title!: string;
    iconColor!: number;
    iconEmojiId?: bigint;

    constructor(args: { flags?: number, titleMissing?: boolean, title?: string, iconColor?: number, iconEmojiId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.titleMissing = args.titleMissing;
        this.title = args.title!;
        this.iconColor = args.iconColor!;
        this.iconEmojiId = args.iconEmojiId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(228168278, false);
        let flags = 0;
        if (this.titleMissing) { flags |= 1 << 1; }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.titleMissing !== undefined && this.titleMissing !== null) {
        }
        writer.tgWriteString(this.title);
        writer.writeInt(this.iconColor);
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) {
            writer.writeLargeInt(this.iconEmojiId, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionTopicCreate {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _titleMissing = true;
            args.titleMissing = _titleMissing;
        } else {
            args.titleMissing = false;
        }
        const _title = reader.tgReadString();
        args.title = _title;
        const _iconColor = reader.readInt();
        args.iconColor = _iconColor;
        if (args.flags & (1 << 0)) {
            const _iconEmojiId = reader.readLargeInt(64);
            args.iconEmojiId = _iconEmojiId;
        } else {
            args.iconEmojiId = undefined;
        }
        return new MessageActionTopicCreate(args);
    }
}