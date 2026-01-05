import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionTopicEdit extends TLObject {
    static CONSTRUCTOR_ID = 3230943264;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionTopicEdit";
    static classType = "constructor";

    flags!: number;
    title?: string;
    iconEmojiId?: bigint;
    closed?: boolean;
    hidden?: boolean;

    constructor(args: { flags?: number, title?: string, iconEmojiId?: bigint, closed?: boolean, hidden?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.title = args.title;
        this.iconEmojiId = args.iconEmojiId;
        this.closed = args.closed;
        this.hidden = args.hidden;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3230943264, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) { flags |= 1 << 1; }
        if (this.closed !== undefined && this.closed !== null) { flags |= 1 << 2; }
        if (this.hidden !== undefined && this.hidden !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) {
            writer.writeLargeInt(this.iconEmojiId, 64);
        }
        if (this.closed !== undefined && this.closed !== null) {
            writer.tgWriteBool(this.closed);
        }
        if (this.hidden !== undefined && this.hidden !== null) {
            writer.tgWriteBool(this.hidden);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionTopicEdit {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _iconEmojiId = reader.readLargeInt(64);
            args.iconEmojiId = _iconEmojiId;
        } else {
            args.iconEmojiId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _closed = reader.tgReadBool();
            args.closed = _closed;
        } else {
            args.closed = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _hidden = reader.tgReadBool();
            args.hidden = _hidden;
        } else {
            args.hidden = undefined;
        }
        return new MessageActionTopicEdit(args);
    }
}