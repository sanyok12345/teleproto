import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeMessageFwdHeader } from "./TypeMessageFwdHeader";
import { TypeMessageReplyHeader } from "./TypeMessageReplyHeader";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypeReplyMarkup } from "./TypeReplyMarkup";
import { TypeMessageEntity } from "./TypeMessageEntity";
import { TypeMessageReplies } from "./TypeMessageReplies";
import { TypeMessageReactions } from "./TypeMessageReactions";
import { TypeRestrictionReason } from "./TypeRestrictionReason";
import { TypeFactCheck } from "./TypeFactCheck";
import { TypeSuggestedPost } from "./TypeSuggestedPost";

export class Message extends TLObject {
    static CONSTRUCTOR_ID = 2629079273;
    static SUBCLASS_OF_ID = 2030045667;
    static className = "Message";
    static classType = "constructor";

    flags!: number;
    out?: boolean;
    mentioned?: boolean;
    mediaUnread?: boolean;
    silent?: boolean;
    post?: boolean;
    fromScheduled?: boolean;
    legacy?: boolean;
    editHide?: boolean;
    pinned?: boolean;
    noforwards?: boolean;
    invertMedia?: boolean;
    flags2!: number;
    offline?: boolean;
    videoProcessingPending?: boolean;
    paidSuggestedPostStars?: boolean;
    paidSuggestedPostTon?: boolean;
    id!: number;
    fromId?: TypePeer;
    fromBoostsApplied?: number;
    peerId!: TypePeer;
    savedPeerId?: TypePeer;
    fwdFrom?: TypeMessageFwdHeader;
    viaBotId?: bigint;
    viaBusinessBotId?: bigint;
    replyTo?: TypeMessageReplyHeader;
    date!: number;
    message!: string;
    media?: TypeMessageMedia;
    replyMarkup?: TypeReplyMarkup;
    entities?: TypeMessageEntity[];
    views?: number;
    forwards?: number;
    replies?: TypeMessageReplies;
    editDate?: number;
    postAuthor?: string;
    groupedId?: bigint;
    reactions?: TypeMessageReactions;
    restrictionReason?: TypeRestrictionReason[];
    ttlPeriod?: number;
    quickReplyShortcutId?: number;
    effect?: bigint;
    factcheck?: TypeFactCheck;
    reportDeliveryUntilDate?: number;
    paidMessageStars?: bigint;
    suggestedPost?: TypeSuggestedPost;
    scheduleRepeatPeriod?: number;
    summaryFromLanguage?: string;

    constructor(args: { flags?: number, out?: boolean, mentioned?: boolean, mediaUnread?: boolean, silent?: boolean, post?: boolean, fromScheduled?: boolean, legacy?: boolean, editHide?: boolean, pinned?: boolean, noforwards?: boolean, invertMedia?: boolean, flags2?: number, offline?: boolean, videoProcessingPending?: boolean, paidSuggestedPostStars?: boolean, paidSuggestedPostTon?: boolean, id?: number, fromId?: TypePeer, fromBoostsApplied?: number, peerId?: TypePeer, savedPeerId?: TypePeer, fwdFrom?: TypeMessageFwdHeader, viaBotId?: bigint, viaBusinessBotId?: bigint, replyTo?: TypeMessageReplyHeader, date?: number, message?: string, media?: TypeMessageMedia, replyMarkup?: TypeReplyMarkup, entities?: TypeMessageEntity[], views?: number, forwards?: number, replies?: TypeMessageReplies, editDate?: number, postAuthor?: string, groupedId?: bigint, reactions?: TypeMessageReactions, restrictionReason?: TypeRestrictionReason[], ttlPeriod?: number, quickReplyShortcutId?: number, effect?: bigint, factcheck?: TypeFactCheck, reportDeliveryUntilDate?: number, paidMessageStars?: bigint, suggestedPost?: TypeSuggestedPost, scheduleRepeatPeriod?: number, summaryFromLanguage?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.out = args.out;
        this.mentioned = args.mentioned;
        this.mediaUnread = args.mediaUnread;
        this.silent = args.silent;
        this.post = args.post;
        this.fromScheduled = args.fromScheduled;
        this.legacy = args.legacy;
        this.editHide = args.editHide;
        this.pinned = args.pinned;
        this.noforwards = args.noforwards;
        this.invertMedia = args.invertMedia;
        this.flags2 = args.flags2!;
        this.offline = args.offline;
        this.videoProcessingPending = args.videoProcessingPending;
        this.paidSuggestedPostStars = args.paidSuggestedPostStars;
        this.paidSuggestedPostTon = args.paidSuggestedPostTon;
        this.id = args.id!;
        this.fromId = args.fromId;
        this.fromBoostsApplied = args.fromBoostsApplied;
        this.peerId = args.peerId!;
        this.savedPeerId = args.savedPeerId;
        this.fwdFrom = args.fwdFrom;
        this.viaBotId = args.viaBotId;
        this.viaBusinessBotId = args.viaBusinessBotId;
        this.replyTo = args.replyTo;
        this.date = args.date!;
        this.message = args.message!;
        this.media = args.media;
        this.replyMarkup = args.replyMarkup;
        this.entities = args.entities;
        this.views = args.views;
        this.forwards = args.forwards;
        this.replies = args.replies;
        this.editDate = args.editDate;
        this.postAuthor = args.postAuthor;
        this.groupedId = args.groupedId;
        this.reactions = args.reactions;
        this.restrictionReason = args.restrictionReason;
        this.ttlPeriod = args.ttlPeriod;
        this.quickReplyShortcutId = args.quickReplyShortcutId;
        this.effect = args.effect;
        this.factcheck = args.factcheck;
        this.reportDeliveryUntilDate = args.reportDeliveryUntilDate;
        this.paidMessageStars = args.paidMessageStars;
        this.suggestedPost = args.suggestedPost;
        this.scheduleRepeatPeriod = args.scheduleRepeatPeriod;
        this.summaryFromLanguage = args.summaryFromLanguage;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2629079273, false);
        let flags = 0;
        if (this.out) { flags |= 1 << 1; }
        if (this.mentioned) { flags |= 1 << 4; }
        if (this.mediaUnread) { flags |= 1 << 5; }
        if (this.silent) { flags |= 1 << 13; }
        if (this.post) { flags |= 1 << 14; }
        if (this.fromScheduled) { flags |= 1 << 18; }
        if (this.legacy) { flags |= 1 << 19; }
        if (this.editHide) { flags |= 1 << 21; }
        if (this.pinned) { flags |= 1 << 24; }
        if (this.noforwards) { flags |= 1 << 26; }
        if (this.invertMedia) { flags |= 1 << 27; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 8; }
        if (this.fromBoostsApplied !== undefined && this.fromBoostsApplied !== null) { flags |= 1 << 29; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 28; }
        if (this.fwdFrom !== undefined && this.fwdFrom !== null) { flags |= 1 << 2; }
        if (this.viaBotId !== undefined && this.viaBotId !== null) { flags |= 1 << 11; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 3; }
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 9; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 6; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 7; }
        if (this.views !== undefined && this.views !== null) { flags |= 1 << 10; }
        if (this.forwards !== undefined && this.forwards !== null) { flags |= 1 << 10; }
        if (this.replies !== undefined && this.replies !== null) { flags |= 1 << 23; }
        if (this.editDate !== undefined && this.editDate !== null) { flags |= 1 << 15; }
        if (this.postAuthor !== undefined && this.postAuthor !== null) { flags |= 1 << 16; }
        if (this.groupedId !== undefined && this.groupedId !== null) { flags |= 1 << 17; }
        if (this.reactions !== undefined && this.reactions !== null) { flags |= 1 << 20; }
        if (this.restrictionReason !== undefined && this.restrictionReason !== null) { flags |= 1 << 22; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 25; }
        if (this.quickReplyShortcutId !== undefined && this.quickReplyShortcutId !== null) { flags |= 1 << 30; }
        writer.writeInt(flags, false);
        let flags2 = 0;
        if (this.offline) { flags2 |= 1 << 1; }
        if (this.videoProcessingPending) { flags2 |= 1 << 4; }
        if (this.paidSuggestedPostStars) { flags2 |= 1 << 8; }
        if (this.paidSuggestedPostTon) { flags2 |= 1 << 9; }
        if (this.viaBusinessBotId !== undefined && this.viaBusinessBotId !== null) { flags2 |= 1 << 0; }
        if (this.effect !== undefined && this.effect !== null) { flags2 |= 1 << 2; }
        if (this.factcheck !== undefined && this.factcheck !== null) { flags2 |= 1 << 3; }
        if (this.reportDeliveryUntilDate !== undefined && this.reportDeliveryUntilDate !== null) { flags2 |= 1 << 5; }
        if (this.paidMessageStars !== undefined && this.paidMessageStars !== null) { flags2 |= 1 << 6; }
        if (this.suggestedPost !== undefined && this.suggestedPost !== null) { flags2 |= 1 << 7; }
        if (this.scheduleRepeatPeriod !== undefined && this.scheduleRepeatPeriod !== null) { flags2 |= 1 << 10; }
        if (this.summaryFromLanguage !== undefined && this.summaryFromLanguage !== null) { flags2 |= 1 << 11; }
        writer.writeInt(flags2, false);
        if (this.out !== undefined && this.out !== null) {
        }
        if (this.mentioned !== undefined && this.mentioned !== null) {
        }
        if (this.mediaUnread !== undefined && this.mediaUnread !== null) {
        }
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.post !== undefined && this.post !== null) {
        }
        if (this.fromScheduled !== undefined && this.fromScheduled !== null) {
        }
        if (this.legacy !== undefined && this.legacy !== null) {
        }
        if (this.editHide !== undefined && this.editHide !== null) {
        }
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        if (this.offline !== undefined && this.offline !== null) {
        }
        if (this.videoProcessingPending !== undefined && this.videoProcessingPending !== null) {
        }
        if (this.paidSuggestedPostStars !== undefined && this.paidSuggestedPostStars !== null) {
        }
        if (this.paidSuggestedPostTon !== undefined && this.paidSuggestedPostTon !== null) {
        }
        writer.writeInt(this.id);
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        if (this.fromBoostsApplied !== undefined && this.fromBoostsApplied !== null) {
            writer.writeInt(this.fromBoostsApplied);
        }
        writer.write(this.peerId.getBytes());
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write(this.savedPeerId.getBytes());
        }
        if (this.fwdFrom !== undefined && this.fwdFrom !== null) {
            writer.write(this.fwdFrom.getBytes());
        }
        if (this.viaBotId !== undefined && this.viaBotId !== null) {
            writer.writeLargeInt(this.viaBotId, 64);
        }
        if (this.viaBusinessBotId !== undefined && this.viaBusinessBotId !== null) {
            writer.writeLargeInt(this.viaBusinessBotId, 64);
        }
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        writer.writeInt(this.date);
        writer.tgWriteString(this.message);
        if (this.media !== undefined && this.media !== null) {
            writer.write(this.media.getBytes());
        }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.views !== undefined && this.views !== null) {
            writer.writeInt(this.views);
        }
        if (this.forwards !== undefined && this.forwards !== null) {
            writer.writeInt(this.forwards);
        }
        if (this.replies !== undefined && this.replies !== null) {
            writer.write(this.replies.getBytes());
        }
        if (this.editDate !== undefined && this.editDate !== null) {
            writer.writeInt(this.editDate);
        }
        if (this.postAuthor !== undefined && this.postAuthor !== null) {
            writer.tgWriteString(this.postAuthor);
        }
        if (this.groupedId !== undefined && this.groupedId !== null) {
            writer.writeLargeInt(this.groupedId, 64);
        }
        if (this.reactions !== undefined && this.reactions !== null) {
            writer.write(this.reactions.getBytes());
        }
        if (this.restrictionReason !== undefined && this.restrictionReason !== null) {
            writer.writeVector(this.restrictionReason, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        if (this.quickReplyShortcutId !== undefined && this.quickReplyShortcutId !== null) {
            writer.writeInt(this.quickReplyShortcutId);
        }
        if (this.effect !== undefined && this.effect !== null) {
            writer.writeLargeInt(this.effect, 64);
        }
        if (this.factcheck !== undefined && this.factcheck !== null) {
            writer.write(this.factcheck.getBytes());
        }
        if (this.reportDeliveryUntilDate !== undefined && this.reportDeliveryUntilDate !== null) {
            writer.writeInt(this.reportDeliveryUntilDate);
        }
        if (this.paidMessageStars !== undefined && this.paidMessageStars !== null) {
            writer.writeLargeInt(this.paidMessageStars, 64);
        }
        if (this.suggestedPost !== undefined && this.suggestedPost !== null) {
            writer.write(this.suggestedPost.getBytes());
        }
        if (this.scheduleRepeatPeriod !== undefined && this.scheduleRepeatPeriod !== null) {
            writer.writeInt(this.scheduleRepeatPeriod);
        }
        if (this.summaryFromLanguage !== undefined && this.summaryFromLanguage !== null) {
            writer.tgWriteString(this.summaryFromLanguage);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Message {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _out = true;
            args.out = _out;
        } else {
            args.out = false;
        }
        if (args.flags & (1 << 4)) {
            const _mentioned = true;
            args.mentioned = _mentioned;
        } else {
            args.mentioned = false;
        }
        if (args.flags & (1 << 5)) {
            const _mediaUnread = true;
            args.mediaUnread = _mediaUnread;
        } else {
            args.mediaUnread = false;
        }
        if (args.flags & (1 << 13)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        if (args.flags & (1 << 14)) {
            const _post = true;
            args.post = _post;
        } else {
            args.post = false;
        }
        if (args.flags & (1 << 18)) {
            const _fromScheduled = true;
            args.fromScheduled = _fromScheduled;
        } else {
            args.fromScheduled = false;
        }
        if (args.flags & (1 << 19)) {
            const _legacy = true;
            args.legacy = _legacy;
        } else {
            args.legacy = false;
        }
        if (args.flags & (1 << 21)) {
            const _editHide = true;
            args.editHide = _editHide;
        } else {
            args.editHide = false;
        }
        if (args.flags & (1 << 24)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 26)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 27)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
        }
        const _flags2 = reader.readInt();
        args.flags2 = _flags2;
        if (args.flags2 & (1 << 1)) {
            const _offline = true;
            args.offline = _offline;
        } else {
            args.offline = false;
        }
        if (args.flags2 & (1 << 4)) {
            const _videoProcessingPending = true;
            args.videoProcessingPending = _videoProcessingPending;
        } else {
            args.videoProcessingPending = false;
        }
        if (args.flags2 & (1 << 8)) {
            const _paidSuggestedPostStars = true;
            args.paidSuggestedPostStars = _paidSuggestedPostStars;
        } else {
            args.paidSuggestedPostStars = false;
        }
        if (args.flags2 & (1 << 9)) {
            const _paidSuggestedPostTon = true;
            args.paidSuggestedPostTon = _paidSuggestedPostTon;
        } else {
            args.paidSuggestedPostTon = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 8)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 29)) {
            const _fromBoostsApplied = reader.readInt();
            args.fromBoostsApplied = _fromBoostsApplied;
        } else {
            args.fromBoostsApplied = undefined;
        }
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        if (args.flags & (1 << 28)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _fwdFrom = reader.tgReadObject();
            args.fwdFrom = _fwdFrom;
        } else {
            args.fwdFrom = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _viaBotId = reader.readLargeInt(64);
            args.viaBotId = _viaBotId;
        } else {
            args.viaBotId = undefined;
        }
        if (args.flags2 & (1 << 0)) {
            const _viaBusinessBotId = reader.readLargeInt(64);
            args.viaBusinessBotId = _viaBusinessBotId;
        } else {
            args.viaBusinessBotId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 9)) {
            const _media = reader.tgReadObject();
            args.media = _media;
        } else {
            args.media = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _views = reader.readInt();
            args.views = _views;
        } else {
            args.views = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _forwards = reader.readInt();
            args.forwards = _forwards;
        } else {
            args.forwards = undefined;
        }
        if (args.flags & (1 << 23)) {
            const _replies = reader.tgReadObject();
            args.replies = _replies;
        } else {
            args.replies = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _editDate = reader.readInt();
            args.editDate = _editDate;
        } else {
            args.editDate = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _postAuthor = reader.tgReadString();
            args.postAuthor = _postAuthor;
        } else {
            args.postAuthor = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _groupedId = reader.readLargeInt(64);
            args.groupedId = _groupedId;
        } else {
            args.groupedId = undefined;
        }
        if (args.flags & (1 << 20)) {
            const _reactions = reader.tgReadObject();
            args.reactions = _reactions;
        } else {
            args.reactions = undefined;
        }
        if (args.flags & (1 << 22)) {
            const _restrictionReason = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.restrictionReason = _restrictionReason;
        } else {
            args.restrictionReason = undefined;
        }
        if (args.flags & (1 << 25)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        if (args.flags & (1 << 30)) {
            const _quickReplyShortcutId = reader.readInt();
            args.quickReplyShortcutId = _quickReplyShortcutId;
        } else {
            args.quickReplyShortcutId = undefined;
        }
        if (args.flags2 & (1 << 2)) {
            const _effect = reader.readLargeInt(64);
            args.effect = _effect;
        } else {
            args.effect = undefined;
        }
        if (args.flags2 & (1 << 3)) {
            const _factcheck = reader.tgReadObject();
            args.factcheck = _factcheck;
        } else {
            args.factcheck = undefined;
        }
        if (args.flags2 & (1 << 5)) {
            const _reportDeliveryUntilDate = reader.readInt();
            args.reportDeliveryUntilDate = _reportDeliveryUntilDate;
        } else {
            args.reportDeliveryUntilDate = undefined;
        }
        if (args.flags2 & (1 << 6)) {
            const _paidMessageStars = reader.readLargeInt(64);
            args.paidMessageStars = _paidMessageStars;
        } else {
            args.paidMessageStars = undefined;
        }
        if (args.flags2 & (1 << 7)) {
            const _suggestedPost = reader.tgReadObject();
            args.suggestedPost = _suggestedPost;
        } else {
            args.suggestedPost = undefined;
        }
        if (args.flags2 & (1 << 10)) {
            const _scheduleRepeatPeriod = reader.readInt();
            args.scheduleRepeatPeriod = _scheduleRepeatPeriod;
        } else {
            args.scheduleRepeatPeriod = undefined;
        }
        if (args.flags2 & (1 << 11)) {
            const _summaryFromLanguage = reader.tgReadString();
            args.summaryFromLanguage = _summaryFromLanguage;
        } else {
            args.summaryFromLanguage = undefined;
        }
        return new Message(args);
    }
}