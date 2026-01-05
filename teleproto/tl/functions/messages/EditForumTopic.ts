import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditForumTopic extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3469480244;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.EditForumTopic";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    topicId!: number;
    title?: string;
    iconEmojiId?: bigint;
    closed?: boolean;
    hidden?: boolean;

    constructor(args: { flags?: number, peer?: EntityLike, topicId?: number, title?: string, iconEmojiId?: bigint, closed?: boolean, hidden?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.topicId = args.topicId!;
        this.title = args.title;
        this.iconEmojiId = args.iconEmojiId;
        this.closed = args.closed;
        this.hidden = args.hidden;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3469480244, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) { flags |= 1 << 1; }
        if (this.closed !== undefined && this.closed !== null) { flags |= 1 << 2; }
        if (this.hidden !== undefined && this.hidden !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.topicId);
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

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditForumTopic {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topicId = reader.readInt();
        args.topicId = _topicId;
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
        return new EditForumTopic(args);
    }
}