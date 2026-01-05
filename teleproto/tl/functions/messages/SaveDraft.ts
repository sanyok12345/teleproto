import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";
import { EntityLike } from "../../types/../../define";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeSuggestedPost } from "../../types/TypeSuggestedPost";

export class SaveDraft extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1420701838;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SaveDraft";
    static classType = "request";

    flags?: number;
    noWebpage?: boolean;
    invertMedia?: boolean;
    replyTo?: TypeInputReplyTo;
    peer?: EntityLike;
    message!: string;
    entities?: TypeMessageEntity[];
    media?: TypeInputMedia;
    effect?: bigint;
    suggestedPost?: TypeSuggestedPost;

    constructor(args: { flags?: number, noWebpage?: boolean, invertMedia?: boolean, replyTo?: TypeInputReplyTo, peer?: EntityLike, message?: string, entities?: TypeMessageEntity[], media?: TypeInputMedia, effect?: bigint, suggestedPost?: TypeSuggestedPost } = {}) {
        super();
        this.flags = args.flags;
        this.noWebpage = args.noWebpage;
        this.invertMedia = args.invertMedia;
        this.replyTo = args.replyTo;
        this.peer = args.peer;
        this.message = args.message!;
        this.entities = args.entities;
        this.media = args.media;
        this.effect = args.effect;
        this.suggestedPost = args.suggestedPost;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1420701838, false);
        let flags = 0;
        if (this.noWebpage) { flags |= 1 << 1; }
        if (this.invertMedia) { flags |= 1 << 6; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 4; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 3; }
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 5; }
        if (this.effect !== undefined && this.effect !== null) { flags |= 1 << 7; }
        if (this.suggestedPost !== undefined && this.suggestedPost !== null) { flags |= 1 << 8; }
        writer.writeInt(flags, false);
        if (this.noWebpage !== undefined && this.noWebpage !== null) {
        }
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.media !== undefined && this.media !== null) {
            writer.write(this.media.getBytes());
        }
        if (this.effect !== undefined && this.effect !== null) {
            writer.writeLargeInt(this.effect, 64);
        }
        if (this.suggestedPost !== undefined && this.suggestedPost !== null) {
            writer.write(this.suggestedPost.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveDraft {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _noWebpage = true;
            args.noWebpage = _noWebpage;
        } else {
            args.noWebpage = false;
        }
        if (args.flags & (1 << 6)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
        }
        if (args.flags & (1 << 4)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 3)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _media = reader.tgReadObject();
            args.media = _media;
        } else {
            args.media = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _effect = reader.readLargeInt(64);
            args.effect = _effect;
        } else {
            args.effect = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _suggestedPost = reader.tgReadObject();
            args.suggestedPost = _suggestedPost;
        } else {
            args.suggestedPost = undefined;
        }
        return new SaveDraft(args);
    }
}