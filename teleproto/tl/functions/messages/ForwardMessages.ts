import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";
import { TypeInputQuickReplyShortcut } from "../../types/TypeInputQuickReplyShortcut";
import { TypeSuggestedPost } from "../../types/TypeSuggestedPost";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ForwardMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 326126204;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.ForwardMessages";
    static classType = "request";

    flags?: number;
    silent?: boolean;
    background?: boolean;
    withMyScore?: boolean;
    dropAuthor?: boolean;
    dropMediaCaptions?: boolean;
    noforwards?: boolean;
    allowPaidFloodskip?: boolean;
    fromPeer?: EntityLike;
    id?: number[];
    randomId!: bigint[];
    toPeer!: EntityLike;
    topMsgId?: number;
    replyTo?: TypeInputReplyTo;
    scheduleDate?: number;
    scheduleRepeatPeriod?: number;
    sendAs?: EntityLike;
    quickReplyShortcut?: TypeInputQuickReplyShortcut;
    effect?: bigint;
    videoTimestamp?: number;
    allowPaidStars?: bigint;
    suggestedPost?: TypeSuggestedPost;

    constructor(args: { flags?: number, silent?: boolean, background?: boolean, withMyScore?: boolean, dropAuthor?: boolean, dropMediaCaptions?: boolean, noforwards?: boolean, allowPaidFloodskip?: boolean, fromPeer?: EntityLike, id?: number[], randomId?: bigint[], toPeer?: EntityLike, topMsgId?: number, replyTo?: TypeInputReplyTo, scheduleDate?: number, scheduleRepeatPeriod?: number, sendAs?: EntityLike, quickReplyShortcut?: TypeInputQuickReplyShortcut, effect?: bigint, videoTimestamp?: number, allowPaidStars?: bigint, suggestedPost?: TypeSuggestedPost } = {}) {
        super();
        this.flags = args.flags;
        this.silent = args.silent;
        this.background = args.background;
        this.withMyScore = args.withMyScore;
        this.dropAuthor = args.dropAuthor;
        this.dropMediaCaptions = args.dropMediaCaptions;
        this.noforwards = args.noforwards;
        this.allowPaidFloodskip = args.allowPaidFloodskip;
        this.fromPeer = args.fromPeer;
        this.id = args.id;
        this.randomId = args.randomId!;
        this.toPeer = args.toPeer!;
        this.topMsgId = args.topMsgId;
        this.replyTo = args.replyTo;
        this.scheduleDate = args.scheduleDate;
        this.scheduleRepeatPeriod = args.scheduleRepeatPeriod;
        this.sendAs = args.sendAs;
        this.quickReplyShortcut = args.quickReplyShortcut;
        this.effect = args.effect;
        this.videoTimestamp = args.videoTimestamp;
        this.allowPaidStars = args.allowPaidStars;
        this.suggestedPost = args.suggestedPost;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(326126204, false);
        let flags = 0;
        if (this.silent) { flags |= 1 << 5; }
        if (this.background) { flags |= 1 << 6; }
        if (this.withMyScore) { flags |= 1 << 8; }
        if (this.dropAuthor) { flags |= 1 << 11; }
        if (this.dropMediaCaptions) { flags |= 1 << 12; }
        if (this.noforwards) { flags |= 1 << 14; }
        if (this.allowPaidFloodskip) { flags |= 1 << 19; }
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 9; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 22; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 10; }
        if (this.scheduleRepeatPeriod !== undefined && this.scheduleRepeatPeriod !== null) { flags |= 1 << 24; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 13; }
        if (this.quickReplyShortcut !== undefined && this.quickReplyShortcut !== null) { flags |= 1 << 17; }
        if (this.effect !== undefined && this.effect !== null) { flags |= 1 << 18; }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) { flags |= 1 << 20; }
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) { flags |= 1 << 21; }
        if (this.suggestedPost !== undefined && this.suggestedPost !== null) { flags |= 1 << 23; }
        writer.writeInt(flags, false);
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.background !== undefined && this.background !== null) {
        }
        if (this.withMyScore !== undefined && this.withMyScore !== null) {
        }
        if (this.dropAuthor !== undefined && this.dropAuthor !== null) {
        }
        if (this.dropMediaCaptions !== undefined && this.dropMediaCaptions !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.allowPaidFloodskip !== undefined && this.allowPaidFloodskip !== null) {
        }
        writer.write((this.fromPeer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.randomId, (item) => {
            writer.writeLargeInt(item, 64);
        });
        writer.write((this.toPeer as any).getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.scheduleRepeatPeriod !== undefined && this.scheduleRepeatPeriod !== null) {
            writer.writeInt(this.scheduleRepeatPeriod);
        }
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
        }
        if (this.quickReplyShortcut !== undefined && this.quickReplyShortcut !== null) {
            writer.write(this.quickReplyShortcut.getBytes());
        }
        if (this.effect !== undefined && this.effect !== null) {
            writer.writeLargeInt(this.effect, 64);
        }
        if (this.videoTimestamp !== undefined && this.videoTimestamp !== null) {
            writer.writeInt(this.videoTimestamp);
        }
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) {
            writer.writeLargeInt(this.allowPaidStars, 64);
        }
        if (this.suggestedPost !== undefined && this.suggestedPost !== null) {
            writer.write(this.suggestedPost.getBytes());
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

    static fromReader(reader: BinaryReader): ForwardMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        if (args.flags & (1 << 6)) {
            const _background = true;
            args.background = _background;
        } else {
            args.background = false;
        }
        if (args.flags & (1 << 8)) {
            const _withMyScore = true;
            args.withMyScore = _withMyScore;
        } else {
            args.withMyScore = false;
        }
        if (args.flags & (1 << 11)) {
            const _dropAuthor = true;
            args.dropAuthor = _dropAuthor;
        } else {
            args.dropAuthor = false;
        }
        if (args.flags & (1 << 12)) {
            const _dropMediaCaptions = true;
            args.dropMediaCaptions = _dropMediaCaptions;
        } else {
            args.dropMediaCaptions = false;
        }
        if (args.flags & (1 << 14)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 19)) {
            const _allowPaidFloodskip = true;
            args.allowPaidFloodskip = _allowPaidFloodskip;
        } else {
            args.allowPaidFloodskip = false;
        }
        const _fromPeer = reader.tgReadObject();
        args.fromPeer = _fromPeer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        const _randomId = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.randomId = _randomId;
        const _toPeer = reader.tgReadObject();
        args.toPeer = _toPeer;
        if (args.flags & (1 << 9)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        if (args.flags & (1 << 22)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        if (args.flags & (1 << 24)) {
            const _scheduleRepeatPeriod = reader.readInt();
            args.scheduleRepeatPeriod = _scheduleRepeatPeriod;
        } else {
            args.scheduleRepeatPeriod = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _sendAs = reader.tgReadObject();
            args.sendAs = _sendAs;
        } else {
            args.sendAs = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _quickReplyShortcut = reader.tgReadObject();
            args.quickReplyShortcut = _quickReplyShortcut;
        } else {
            args.quickReplyShortcut = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _effect = reader.readLargeInt(64);
            args.effect = _effect;
        } else {
            args.effect = undefined;
        }
        if (args.flags & (1 << 20)) {
            const _videoTimestamp = reader.readInt();
            args.videoTimestamp = _videoTimestamp;
        } else {
            args.videoTimestamp = undefined;
        }
        if (args.flags & (1 << 21)) {
            const _allowPaidStars = reader.readLargeInt(64);
            args.allowPaidStars = _allowPaidStars;
        } else {
            args.allowPaidStars = undefined;
        }
        if (args.flags & (1 << 23)) {
            const _suggestedPost = reader.tgReadObject();
            args.suggestedPost = _suggestedPost;
        } else {
            args.suggestedPost = undefined;
        }
        return new ForwardMessages(args);
    }
}