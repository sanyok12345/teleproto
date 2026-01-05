import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class CreateForumTopic extends MTProtoRequest {
    static CONSTRUCTOR_ID = 798540757;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.CreateForumTopic";
    static classType = "request";

    flags?: number;
    titleMissing?: boolean;
    peer?: EntityLike;
    title!: string;
    iconColor?: number;
    iconEmojiId?: bigint;
    randomId!: bigint;
    sendAs?: EntityLike;

    constructor(args: { flags?: number, titleMissing?: boolean, peer?: EntityLike, title?: string, iconColor?: number, iconEmojiId?: bigint, randomId?: bigint, sendAs?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.titleMissing = args.titleMissing;
        this.peer = args.peer;
        this.title = args.title!;
        this.iconColor = args.iconColor;
        this.iconEmojiId = args.iconEmojiId;
        this.randomId = args.randomId!;
        this.sendAs = args.sendAs;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(798540757, false);
        let flags = 0;
        if (this.titleMissing) { flags |= 1 << 4; }
        if (this.iconColor !== undefined && this.iconColor !== null) { flags |= 1 << 0; }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) { flags |= 1 << 3; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.titleMissing !== undefined && this.titleMissing !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.title);
        if (this.iconColor !== undefined && this.iconColor !== null) {
            writer.writeInt(this.iconColor);
        }
        if (this.iconEmojiId !== undefined && this.iconEmojiId !== null) {
            writer.writeLargeInt(this.iconEmojiId, 64);
        }
        writer.writeLargeInt(this.randomId, 64);
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
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

    static fromReader(reader: BinaryReader): CreateForumTopic {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 4)) {
            const _titleMissing = true;
            args.titleMissing = _titleMissing;
        } else {
            args.titleMissing = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 0)) {
            const _iconColor = reader.readInt();
            args.iconColor = _iconColor;
        } else {
            args.iconColor = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _iconEmojiId = reader.readLargeInt(64);
            args.iconEmojiId = _iconEmojiId;
        } else {
            args.iconEmojiId = undefined;
        }
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        if (args.flags & (1 << 2)) {
            const _sendAs = reader.tgReadObject();
            args.sendAs = _sendAs;
        } else {
            args.sendAs = undefined;
        }
        return new CreateForumTopic(args);
    }
}