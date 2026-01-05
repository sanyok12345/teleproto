import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypePeerNotifySettings } from "./TypePeerNotifySettings";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";
import { TypeBotInfo } from "./TypeBotInfo";
import { TypeStickerSet } from "./TypeStickerSet";
import { TypeChannelLocation } from "./TypeChannelLocation";
import { TypeInputGroupCall } from "./TypeInputGroupCall";
import { TypePeer } from "./TypePeer";
import { TypeChatReactions } from "./TypeChatReactions";
import { TypePeerStories } from "./TypePeerStories";
import { TypeWallPaper } from "./TypeWallPaper";
import { TypeBotVerification } from "./TypeBotVerification";
import { TypeProfileTab } from "./TypeProfileTab";

export class ChannelFull extends TLObject {
    static CONSTRUCTOR_ID = 3839931037;
    static SUBCLASS_OF_ID = 3566872215;
    static className = "ChannelFull";
    static classType = "constructor";

    flags!: number;
    canViewParticipants?: boolean;
    canSetUsername?: boolean;
    canSetStickers?: boolean;
    hiddenPrehistory?: boolean;
    canSetLocation?: boolean;
    hasScheduled?: boolean;
    canViewStats?: boolean;
    blocked?: boolean;
    flags2!: number;
    canDeleteChannel?: boolean;
    antispam?: boolean;
    participantsHidden?: boolean;
    translationsDisabled?: boolean;
    storiesPinnedAvailable?: boolean;
    viewForumAsMessages?: boolean;
    restrictedSponsored?: boolean;
    canViewRevenue?: boolean;
    paidMediaAllowed?: boolean;
    canViewStarsRevenue?: boolean;
    paidReactionsAvailable?: boolean;
    stargiftsAvailable?: boolean;
    paidMessagesAvailable?: boolean;
    id!: bigint;
    about!: string;
    participantsCount?: number;
    adminsCount?: number;
    kickedCount?: number;
    bannedCount?: number;
    onlineCount?: number;
    readInboxMaxId!: number;
    readOutboxMaxId!: number;
    unreadCount!: number;
    chatPhoto!: TypePhoto;
    notifySettings!: TypePeerNotifySettings;
    exportedInvite?: TypeExportedChatInvite;
    botInfo!: TypeBotInfo[];
    migratedFromChatId?: bigint;
    migratedFromMaxId?: number;
    pinnedMsgId?: number;
    stickerset?: TypeStickerSet;
    availableMinId?: number;
    folderId?: number;
    linkedChatId?: bigint;
    location?: TypeChannelLocation;
    slowmodeSeconds?: number;
    slowmodeNextSendDate?: number;
    statsDc?: number;
    pts!: number;
    call?: TypeInputGroupCall;
    ttlPeriod?: number;
    pendingSuggestions?: string[];
    groupcallDefaultJoinAs?: TypePeer;
    themeEmoticon?: string;
    requestsPending?: number;
    recentRequesters?: bigint[];
    defaultSendAs?: TypePeer;
    availableReactions?: TypeChatReactions;
    reactionsLimit?: number;
    stories?: TypePeerStories;
    wallpaper?: TypeWallPaper;
    boostsApplied?: number;
    boostsUnrestrict?: number;
    emojiset?: TypeStickerSet;
    botVerification?: TypeBotVerification;
    stargiftsCount?: number;
    sendPaidMessagesStars?: bigint;
    mainTab?: TypeProfileTab;

    constructor(args: { flags?: number, canViewParticipants?: boolean, canSetUsername?: boolean, canSetStickers?: boolean, hiddenPrehistory?: boolean, canSetLocation?: boolean, hasScheduled?: boolean, canViewStats?: boolean, blocked?: boolean, flags2?: number, canDeleteChannel?: boolean, antispam?: boolean, participantsHidden?: boolean, translationsDisabled?: boolean, storiesPinnedAvailable?: boolean, viewForumAsMessages?: boolean, restrictedSponsored?: boolean, canViewRevenue?: boolean, paidMediaAllowed?: boolean, canViewStarsRevenue?: boolean, paidReactionsAvailable?: boolean, stargiftsAvailable?: boolean, paidMessagesAvailable?: boolean, id?: bigint, about?: string, participantsCount?: number, adminsCount?: number, kickedCount?: number, bannedCount?: number, onlineCount?: number, readInboxMaxId?: number, readOutboxMaxId?: number, unreadCount?: number, chatPhoto?: TypePhoto, notifySettings?: TypePeerNotifySettings, exportedInvite?: TypeExportedChatInvite, botInfo?: TypeBotInfo[], migratedFromChatId?: bigint, migratedFromMaxId?: number, pinnedMsgId?: number, stickerset?: TypeStickerSet, availableMinId?: number, folderId?: number, linkedChatId?: bigint, location?: TypeChannelLocation, slowmodeSeconds?: number, slowmodeNextSendDate?: number, statsDc?: number, pts?: number, call?: TypeInputGroupCall, ttlPeriod?: number, pendingSuggestions?: string[], groupcallDefaultJoinAs?: TypePeer, themeEmoticon?: string, requestsPending?: number, recentRequesters?: bigint[], defaultSendAs?: TypePeer, availableReactions?: TypeChatReactions, reactionsLimit?: number, stories?: TypePeerStories, wallpaper?: TypeWallPaper, boostsApplied?: number, boostsUnrestrict?: number, emojiset?: TypeStickerSet, botVerification?: TypeBotVerification, stargiftsCount?: number, sendPaidMessagesStars?: bigint, mainTab?: TypeProfileTab } = {}) {
        super();
        this.flags = args.flags!;
        this.canViewParticipants = args.canViewParticipants;
        this.canSetUsername = args.canSetUsername;
        this.canSetStickers = args.canSetStickers;
        this.hiddenPrehistory = args.hiddenPrehistory;
        this.canSetLocation = args.canSetLocation;
        this.hasScheduled = args.hasScheduled;
        this.canViewStats = args.canViewStats;
        this.blocked = args.blocked;
        this.flags2 = args.flags2!;
        this.canDeleteChannel = args.canDeleteChannel;
        this.antispam = args.antispam;
        this.participantsHidden = args.participantsHidden;
        this.translationsDisabled = args.translationsDisabled;
        this.storiesPinnedAvailable = args.storiesPinnedAvailable;
        this.viewForumAsMessages = args.viewForumAsMessages;
        this.restrictedSponsored = args.restrictedSponsored;
        this.canViewRevenue = args.canViewRevenue;
        this.paidMediaAllowed = args.paidMediaAllowed;
        this.canViewStarsRevenue = args.canViewStarsRevenue;
        this.paidReactionsAvailable = args.paidReactionsAvailable;
        this.stargiftsAvailable = args.stargiftsAvailable;
        this.paidMessagesAvailable = args.paidMessagesAvailable;
        this.id = args.id!;
        this.about = args.about!;
        this.participantsCount = args.participantsCount;
        this.adminsCount = args.adminsCount;
        this.kickedCount = args.kickedCount;
        this.bannedCount = args.bannedCount;
        this.onlineCount = args.onlineCount;
        this.readInboxMaxId = args.readInboxMaxId!;
        this.readOutboxMaxId = args.readOutboxMaxId!;
        this.unreadCount = args.unreadCount!;
        this.chatPhoto = args.chatPhoto!;
        this.notifySettings = args.notifySettings!;
        this.exportedInvite = args.exportedInvite;
        this.botInfo = args.botInfo!;
        this.migratedFromChatId = args.migratedFromChatId;
        this.migratedFromMaxId = args.migratedFromMaxId;
        this.pinnedMsgId = args.pinnedMsgId;
        this.stickerset = args.stickerset;
        this.availableMinId = args.availableMinId;
        this.folderId = args.folderId;
        this.linkedChatId = args.linkedChatId;
        this.location = args.location;
        this.slowmodeSeconds = args.slowmodeSeconds;
        this.slowmodeNextSendDate = args.slowmodeNextSendDate;
        this.statsDc = args.statsDc;
        this.pts = args.pts!;
        this.call = args.call;
        this.ttlPeriod = args.ttlPeriod;
        this.pendingSuggestions = args.pendingSuggestions;
        this.groupcallDefaultJoinAs = args.groupcallDefaultJoinAs;
        this.themeEmoticon = args.themeEmoticon;
        this.requestsPending = args.requestsPending;
        this.recentRequesters = args.recentRequesters;
        this.defaultSendAs = args.defaultSendAs;
        this.availableReactions = args.availableReactions;
        this.reactionsLimit = args.reactionsLimit;
        this.stories = args.stories;
        this.wallpaper = args.wallpaper;
        this.boostsApplied = args.boostsApplied;
        this.boostsUnrestrict = args.boostsUnrestrict;
        this.emojiset = args.emojiset;
        this.botVerification = args.botVerification;
        this.stargiftsCount = args.stargiftsCount;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
        this.mainTab = args.mainTab;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3839931037, false);
        let flags = 0;
        if (this.canViewParticipants) { flags |= 1 << 3; }
        if (this.canSetUsername) { flags |= 1 << 6; }
        if (this.canSetStickers) { flags |= 1 << 7; }
        if (this.hiddenPrehistory) { flags |= 1 << 10; }
        if (this.canSetLocation) { flags |= 1 << 16; }
        if (this.hasScheduled) { flags |= 1 << 19; }
        if (this.canViewStats) { flags |= 1 << 20; }
        if (this.blocked) { flags |= 1 << 22; }
        if (this.participantsCount !== undefined && this.participantsCount !== null) { flags |= 1 << 0; }
        if (this.adminsCount !== undefined && this.adminsCount !== null) { flags |= 1 << 1; }
        if (this.kickedCount !== undefined && this.kickedCount !== null) { flags |= 1 << 2; }
        if (this.bannedCount !== undefined && this.bannedCount !== null) { flags |= 1 << 2; }
        if (this.onlineCount !== undefined && this.onlineCount !== null) { flags |= 1 << 13; }
        if (this.exportedInvite !== undefined && this.exportedInvite !== null) { flags |= 1 << 23; }
        if (this.migratedFromChatId !== undefined && this.migratedFromChatId !== null) { flags |= 1 << 4; }
        if (this.migratedFromMaxId !== undefined && this.migratedFromMaxId !== null) { flags |= 1 << 4; }
        if (this.pinnedMsgId !== undefined && this.pinnedMsgId !== null) { flags |= 1 << 5; }
        if (this.stickerset !== undefined && this.stickerset !== null) { flags |= 1 << 8; }
        if (this.availableMinId !== undefined && this.availableMinId !== null) { flags |= 1 << 9; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 11; }
        if (this.linkedChatId !== undefined && this.linkedChatId !== null) { flags |= 1 << 14; }
        if (this.location !== undefined && this.location !== null) { flags |= 1 << 15; }
        if (this.slowmodeSeconds !== undefined && this.slowmodeSeconds !== null) { flags |= 1 << 17; }
        if (this.slowmodeNextSendDate !== undefined && this.slowmodeNextSendDate !== null) { flags |= 1 << 18; }
        if (this.statsDc !== undefined && this.statsDc !== null) { flags |= 1 << 12; }
        if (this.call !== undefined && this.call !== null) { flags |= 1 << 21; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 24; }
        if (this.pendingSuggestions !== undefined && this.pendingSuggestions !== null) { flags |= 1 << 25; }
        if (this.groupcallDefaultJoinAs !== undefined && this.groupcallDefaultJoinAs !== null) { flags |= 1 << 26; }
        if (this.themeEmoticon !== undefined && this.themeEmoticon !== null) { flags |= 1 << 27; }
        if (this.requestsPending !== undefined && this.requestsPending !== null) { flags |= 1 << 28; }
        if (this.recentRequesters !== undefined && this.recentRequesters !== null) { flags |= 1 << 28; }
        if (this.defaultSendAs !== undefined && this.defaultSendAs !== null) { flags |= 1 << 29; }
        if (this.availableReactions !== undefined && this.availableReactions !== null) { flags |= 1 << 30; }
        writer.writeInt(flags, false);
        let flags2 = 0;
        if (this.canDeleteChannel) { flags2 |= 1 << 0; }
        if (this.antispam) { flags2 |= 1 << 1; }
        if (this.participantsHidden) { flags2 |= 1 << 2; }
        if (this.translationsDisabled) { flags2 |= 1 << 3; }
        if (this.storiesPinnedAvailable) { flags2 |= 1 << 5; }
        if (this.viewForumAsMessages) { flags2 |= 1 << 6; }
        if (this.restrictedSponsored) { flags2 |= 1 << 11; }
        if (this.canViewRevenue) { flags2 |= 1 << 12; }
        if (this.paidMediaAllowed) { flags2 |= 1 << 14; }
        if (this.canViewStarsRevenue) { flags2 |= 1 << 15; }
        if (this.paidReactionsAvailable) { flags2 |= 1 << 16; }
        if (this.stargiftsAvailable) { flags2 |= 1 << 19; }
        if (this.paidMessagesAvailable) { flags2 |= 1 << 20; }
        if (this.reactionsLimit !== undefined && this.reactionsLimit !== null) { flags2 |= 1 << 13; }
        if (this.stories !== undefined && this.stories !== null) { flags2 |= 1 << 4; }
        if (this.wallpaper !== undefined && this.wallpaper !== null) { flags2 |= 1 << 7; }
        if (this.boostsApplied !== undefined && this.boostsApplied !== null) { flags2 |= 1 << 8; }
        if (this.boostsUnrestrict !== undefined && this.boostsUnrestrict !== null) { flags2 |= 1 << 9; }
        if (this.emojiset !== undefined && this.emojiset !== null) { flags2 |= 1 << 10; }
        if (this.botVerification !== undefined && this.botVerification !== null) { flags2 |= 1 << 17; }
        if (this.stargiftsCount !== undefined && this.stargiftsCount !== null) { flags2 |= 1 << 18; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags2 |= 1 << 21; }
        if (this.mainTab !== undefined && this.mainTab !== null) { flags2 |= 1 << 22; }
        writer.writeInt(flags2, false);
        if (this.canViewParticipants !== undefined && this.canViewParticipants !== null) {
        }
        if (this.canSetUsername !== undefined && this.canSetUsername !== null) {
        }
        if (this.canSetStickers !== undefined && this.canSetStickers !== null) {
        }
        if (this.hiddenPrehistory !== undefined && this.hiddenPrehistory !== null) {
        }
        if (this.canSetLocation !== undefined && this.canSetLocation !== null) {
        }
        if (this.hasScheduled !== undefined && this.hasScheduled !== null) {
        }
        if (this.canViewStats !== undefined && this.canViewStats !== null) {
        }
        if (this.blocked !== undefined && this.blocked !== null) {
        }
        if (this.canDeleteChannel !== undefined && this.canDeleteChannel !== null) {
        }
        if (this.antispam !== undefined && this.antispam !== null) {
        }
        if (this.participantsHidden !== undefined && this.participantsHidden !== null) {
        }
        if (this.translationsDisabled !== undefined && this.translationsDisabled !== null) {
        }
        if (this.storiesPinnedAvailable !== undefined && this.storiesPinnedAvailable !== null) {
        }
        if (this.viewForumAsMessages !== undefined && this.viewForumAsMessages !== null) {
        }
        if (this.restrictedSponsored !== undefined && this.restrictedSponsored !== null) {
        }
        if (this.canViewRevenue !== undefined && this.canViewRevenue !== null) {
        }
        if (this.paidMediaAllowed !== undefined && this.paidMediaAllowed !== null) {
        }
        if (this.canViewStarsRevenue !== undefined && this.canViewStarsRevenue !== null) {
        }
        if (this.paidReactionsAvailable !== undefined && this.paidReactionsAvailable !== null) {
        }
        if (this.stargiftsAvailable !== undefined && this.stargiftsAvailable !== null) {
        }
        if (this.paidMessagesAvailable !== undefined && this.paidMessagesAvailable !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.about);
        if (this.participantsCount !== undefined && this.participantsCount !== null) {
            writer.writeInt(this.participantsCount);
        }
        if (this.adminsCount !== undefined && this.adminsCount !== null) {
            writer.writeInt(this.adminsCount);
        }
        if (this.kickedCount !== undefined && this.kickedCount !== null) {
            writer.writeInt(this.kickedCount);
        }
        if (this.bannedCount !== undefined && this.bannedCount !== null) {
            writer.writeInt(this.bannedCount);
        }
        if (this.onlineCount !== undefined && this.onlineCount !== null) {
            writer.writeInt(this.onlineCount);
        }
        writer.writeInt(this.readInboxMaxId);
        writer.writeInt(this.readOutboxMaxId);
        writer.writeInt(this.unreadCount);
        writer.write(this.chatPhoto.getBytes());
        writer.write(this.notifySettings.getBytes());
        if (this.exportedInvite !== undefined && this.exportedInvite !== null) {
            writer.write(this.exportedInvite.getBytes());
        }
        writer.writeVector(this.botInfo, (item) => {
            writer.write(item.getBytes());
        });
        if (this.migratedFromChatId !== undefined && this.migratedFromChatId !== null) {
            writer.writeLargeInt(this.migratedFromChatId, 64);
        }
        if (this.migratedFromMaxId !== undefined && this.migratedFromMaxId !== null) {
            writer.writeInt(this.migratedFromMaxId);
        }
        if (this.pinnedMsgId !== undefined && this.pinnedMsgId !== null) {
            writer.writeInt(this.pinnedMsgId);
        }
        if (this.stickerset !== undefined && this.stickerset !== null) {
            writer.write(this.stickerset.getBytes());
        }
        if (this.availableMinId !== undefined && this.availableMinId !== null) {
            writer.writeInt(this.availableMinId);
        }
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        if (this.linkedChatId !== undefined && this.linkedChatId !== null) {
            writer.writeLargeInt(this.linkedChatId, 64);
        }
        if (this.location !== undefined && this.location !== null) {
            writer.write(this.location.getBytes());
        }
        if (this.slowmodeSeconds !== undefined && this.slowmodeSeconds !== null) {
            writer.writeInt(this.slowmodeSeconds);
        }
        if (this.slowmodeNextSendDate !== undefined && this.slowmodeNextSendDate !== null) {
            writer.writeInt(this.slowmodeNextSendDate);
        }
        if (this.statsDc !== undefined && this.statsDc !== null) {
            writer.writeInt(this.statsDc);
        }
        writer.writeInt(this.pts);
        if (this.call !== undefined && this.call !== null) {
            writer.write(this.call.getBytes());
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        if (this.pendingSuggestions !== undefined && this.pendingSuggestions !== null) {
            writer.writeVector(this.pendingSuggestions, (item) => {
                writer.tgWriteString(item);
            });
        }
        if (this.groupcallDefaultJoinAs !== undefined && this.groupcallDefaultJoinAs !== null) {
            writer.write(this.groupcallDefaultJoinAs.getBytes());
        }
        if (this.themeEmoticon !== undefined && this.themeEmoticon !== null) {
            writer.tgWriteString(this.themeEmoticon);
        }
        if (this.requestsPending !== undefined && this.requestsPending !== null) {
            writer.writeInt(this.requestsPending);
        }
        if (this.recentRequesters !== undefined && this.recentRequesters !== null) {
            writer.writeVector(this.recentRequesters, (item) => {
                writer.writeLargeInt(item, 64);
            });
        }
        if (this.defaultSendAs !== undefined && this.defaultSendAs !== null) {
            writer.write(this.defaultSendAs.getBytes());
        }
        if (this.availableReactions !== undefined && this.availableReactions !== null) {
            writer.write(this.availableReactions.getBytes());
        }
        if (this.reactionsLimit !== undefined && this.reactionsLimit !== null) {
            writer.writeInt(this.reactionsLimit);
        }
        if (this.stories !== undefined && this.stories !== null) {
            writer.write(this.stories.getBytes());
        }
        if (this.wallpaper !== undefined && this.wallpaper !== null) {
            writer.write(this.wallpaper.getBytes());
        }
        if (this.boostsApplied !== undefined && this.boostsApplied !== null) {
            writer.writeInt(this.boostsApplied);
        }
        if (this.boostsUnrestrict !== undefined && this.boostsUnrestrict !== null) {
            writer.writeInt(this.boostsUnrestrict);
        }
        if (this.emojiset !== undefined && this.emojiset !== null) {
            writer.write(this.emojiset.getBytes());
        }
        if (this.botVerification !== undefined && this.botVerification !== null) {
            writer.write(this.botVerification.getBytes());
        }
        if (this.stargiftsCount !== undefined && this.stargiftsCount !== null) {
            writer.writeInt(this.stargiftsCount);
        }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) {
            writer.writeLargeInt(this.sendPaidMessagesStars, 64);
        }
        if (this.mainTab !== undefined && this.mainTab !== null) {
            writer.write(this.mainTab.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelFull {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _canViewParticipants = true;
            args.canViewParticipants = _canViewParticipants;
        } else {
            args.canViewParticipants = false;
        }
        if (args.flags & (1 << 6)) {
            const _canSetUsername = true;
            args.canSetUsername = _canSetUsername;
        } else {
            args.canSetUsername = false;
        }
        if (args.flags & (1 << 7)) {
            const _canSetStickers = true;
            args.canSetStickers = _canSetStickers;
        } else {
            args.canSetStickers = false;
        }
        if (args.flags & (1 << 10)) {
            const _hiddenPrehistory = true;
            args.hiddenPrehistory = _hiddenPrehistory;
        } else {
            args.hiddenPrehistory = false;
        }
        if (args.flags & (1 << 16)) {
            const _canSetLocation = true;
            args.canSetLocation = _canSetLocation;
        } else {
            args.canSetLocation = false;
        }
        if (args.flags & (1 << 19)) {
            const _hasScheduled = true;
            args.hasScheduled = _hasScheduled;
        } else {
            args.hasScheduled = false;
        }
        if (args.flags & (1 << 20)) {
            const _canViewStats = true;
            args.canViewStats = _canViewStats;
        } else {
            args.canViewStats = false;
        }
        if (args.flags & (1 << 22)) {
            const _blocked = true;
            args.blocked = _blocked;
        } else {
            args.blocked = false;
        }
        const _flags2 = reader.readInt();
        args.flags2 = _flags2;
        if (args.flags2 & (1 << 0)) {
            const _canDeleteChannel = true;
            args.canDeleteChannel = _canDeleteChannel;
        } else {
            args.canDeleteChannel = false;
        }
        if (args.flags2 & (1 << 1)) {
            const _antispam = true;
            args.antispam = _antispam;
        } else {
            args.antispam = false;
        }
        if (args.flags2 & (1 << 2)) {
            const _participantsHidden = true;
            args.participantsHidden = _participantsHidden;
        } else {
            args.participantsHidden = false;
        }
        if (args.flags2 & (1 << 3)) {
            const _translationsDisabled = true;
            args.translationsDisabled = _translationsDisabled;
        } else {
            args.translationsDisabled = false;
        }
        if (args.flags2 & (1 << 5)) {
            const _storiesPinnedAvailable = true;
            args.storiesPinnedAvailable = _storiesPinnedAvailable;
        } else {
            args.storiesPinnedAvailable = false;
        }
        if (args.flags2 & (1 << 6)) {
            const _viewForumAsMessages = true;
            args.viewForumAsMessages = _viewForumAsMessages;
        } else {
            args.viewForumAsMessages = false;
        }
        if (args.flags2 & (1 << 11)) {
            const _restrictedSponsored = true;
            args.restrictedSponsored = _restrictedSponsored;
        } else {
            args.restrictedSponsored = false;
        }
        if (args.flags2 & (1 << 12)) {
            const _canViewRevenue = true;
            args.canViewRevenue = _canViewRevenue;
        } else {
            args.canViewRevenue = false;
        }
        if (args.flags2 & (1 << 14)) {
            const _paidMediaAllowed = true;
            args.paidMediaAllowed = _paidMediaAllowed;
        } else {
            args.paidMediaAllowed = false;
        }
        if (args.flags2 & (1 << 15)) {
            const _canViewStarsRevenue = true;
            args.canViewStarsRevenue = _canViewStarsRevenue;
        } else {
            args.canViewStarsRevenue = false;
        }
        if (args.flags2 & (1 << 16)) {
            const _paidReactionsAvailable = true;
            args.paidReactionsAvailable = _paidReactionsAvailable;
        } else {
            args.paidReactionsAvailable = false;
        }
        if (args.flags2 & (1 << 19)) {
            const _stargiftsAvailable = true;
            args.stargiftsAvailable = _stargiftsAvailable;
        } else {
            args.stargiftsAvailable = false;
        }
        if (args.flags2 & (1 << 20)) {
            const _paidMessagesAvailable = true;
            args.paidMessagesAvailable = _paidMessagesAvailable;
        } else {
            args.paidMessagesAvailable = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _about = reader.tgReadString();
        args.about = _about;
        if (args.flags & (1 << 0)) {
            const _participantsCount = reader.readInt();
            args.participantsCount = _participantsCount;
        } else {
            args.participantsCount = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _adminsCount = reader.readInt();
            args.adminsCount = _adminsCount;
        } else {
            args.adminsCount = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _kickedCount = reader.readInt();
            args.kickedCount = _kickedCount;
        } else {
            args.kickedCount = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _bannedCount = reader.readInt();
            args.bannedCount = _bannedCount;
        } else {
            args.bannedCount = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _onlineCount = reader.readInt();
            args.onlineCount = _onlineCount;
        } else {
            args.onlineCount = undefined;
        }
        const _readInboxMaxId = reader.readInt();
        args.readInboxMaxId = _readInboxMaxId;
        const _readOutboxMaxId = reader.readInt();
        args.readOutboxMaxId = _readOutboxMaxId;
        const _unreadCount = reader.readInt();
        args.unreadCount = _unreadCount;
        const _chatPhoto = reader.tgReadObject();
        args.chatPhoto = _chatPhoto;
        const _notifySettings = reader.tgReadObject();
        args.notifySettings = _notifySettings;
        if (args.flags & (1 << 23)) {
            const _exportedInvite = reader.tgReadObject();
            args.exportedInvite = _exportedInvite;
        } else {
            args.exportedInvite = undefined;
        }
        const _botInfo = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.botInfo = _botInfo;
        if (args.flags & (1 << 4)) {
            const _migratedFromChatId = reader.readLargeInt(64);
            args.migratedFromChatId = _migratedFromChatId;
        } else {
            args.migratedFromChatId = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _migratedFromMaxId = reader.readInt();
            args.migratedFromMaxId = _migratedFromMaxId;
        } else {
            args.migratedFromMaxId = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _pinnedMsgId = reader.readInt();
            args.pinnedMsgId = _pinnedMsgId;
        } else {
            args.pinnedMsgId = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _stickerset = reader.tgReadObject();
            args.stickerset = _stickerset;
        } else {
            args.stickerset = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _availableMinId = reader.readInt();
            args.availableMinId = _availableMinId;
        } else {
            args.availableMinId = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _linkedChatId = reader.readLargeInt(64);
            args.linkedChatId = _linkedChatId;
        } else {
            args.linkedChatId = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _location = reader.tgReadObject();
            args.location = _location;
        } else {
            args.location = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _slowmodeSeconds = reader.readInt();
            args.slowmodeSeconds = _slowmodeSeconds;
        } else {
            args.slowmodeSeconds = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _slowmodeNextSendDate = reader.readInt();
            args.slowmodeNextSendDate = _slowmodeNextSendDate;
        } else {
            args.slowmodeNextSendDate = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _statsDc = reader.readInt();
            args.statsDc = _statsDc;
        } else {
            args.statsDc = undefined;
        }
        const _pts = reader.readInt();
        args.pts = _pts;
        if (args.flags & (1 << 21)) {
            const _call = reader.tgReadObject();
            args.call = _call;
        } else {
            args.call = undefined;
        }
        if (args.flags & (1 << 24)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        if (args.flags & (1 << 25)) {
            const _pendingSuggestions = reader.readVector((reader) => {
                const item = reader.tgReadString();
                return item;
            });
            args.pendingSuggestions = _pendingSuggestions;
        } else {
            args.pendingSuggestions = undefined;
        }
        if (args.flags & (1 << 26)) {
            const _groupcallDefaultJoinAs = reader.tgReadObject();
            args.groupcallDefaultJoinAs = _groupcallDefaultJoinAs;
        } else {
            args.groupcallDefaultJoinAs = undefined;
        }
        if (args.flags & (1 << 27)) {
            const _themeEmoticon = reader.tgReadString();
            args.themeEmoticon = _themeEmoticon;
        } else {
            args.themeEmoticon = undefined;
        }
        if (args.flags & (1 << 28)) {
            const _requestsPending = reader.readInt();
            args.requestsPending = _requestsPending;
        } else {
            args.requestsPending = undefined;
        }
        if (args.flags & (1 << 28)) {
            const _recentRequesters = reader.readVector((reader) => {
                const item = reader.readLargeInt(64);
                return item;
            });
            args.recentRequesters = _recentRequesters;
        } else {
            args.recentRequesters = undefined;
        }
        if (args.flags & (1 << 29)) {
            const _defaultSendAs = reader.tgReadObject();
            args.defaultSendAs = _defaultSendAs;
        } else {
            args.defaultSendAs = undefined;
        }
        if (args.flags & (1 << 30)) {
            const _availableReactions = reader.tgReadObject();
            args.availableReactions = _availableReactions;
        } else {
            args.availableReactions = undefined;
        }
        if (args.flags2 & (1 << 13)) {
            const _reactionsLimit = reader.readInt();
            args.reactionsLimit = _reactionsLimit;
        } else {
            args.reactionsLimit = undefined;
        }
        if (args.flags2 & (1 << 4)) {
            const _stories = reader.tgReadObject();
            args.stories = _stories;
        } else {
            args.stories = undefined;
        }
        if (args.flags2 & (1 << 7)) {
            const _wallpaper = reader.tgReadObject();
            args.wallpaper = _wallpaper;
        } else {
            args.wallpaper = undefined;
        }
        if (args.flags2 & (1 << 8)) {
            const _boostsApplied = reader.readInt();
            args.boostsApplied = _boostsApplied;
        } else {
            args.boostsApplied = undefined;
        }
        if (args.flags2 & (1 << 9)) {
            const _boostsUnrestrict = reader.readInt();
            args.boostsUnrestrict = _boostsUnrestrict;
        } else {
            args.boostsUnrestrict = undefined;
        }
        if (args.flags2 & (1 << 10)) {
            const _emojiset = reader.tgReadObject();
            args.emojiset = _emojiset;
        } else {
            args.emojiset = undefined;
        }
        if (args.flags2 & (1 << 17)) {
            const _botVerification = reader.tgReadObject();
            args.botVerification = _botVerification;
        } else {
            args.botVerification = undefined;
        }
        if (args.flags2 & (1 << 18)) {
            const _stargiftsCount = reader.readInt();
            args.stargiftsCount = _stargiftsCount;
        } else {
            args.stargiftsCount = undefined;
        }
        if (args.flags2 & (1 << 21)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        if (args.flags2 & (1 << 22)) {
            const _mainTab = reader.tgReadObject();
            args.mainTab = _mainTab;
        } else {
            args.mainTab = undefined;
        }
        return new ChannelFull(args);
    }
}