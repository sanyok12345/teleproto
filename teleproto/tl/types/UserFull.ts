import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeerSettings } from "./TypePeerSettings";
import { TypePhoto } from "./TypePhoto";
import { TypePeerNotifySettings } from "./TypePeerNotifySettings";
import { TypeBotInfo } from "./TypeBotInfo";
import { TypeChatTheme } from "./TypeChatTheme";
import { TypeChatAdminRights } from "./TypeChatAdminRights";
import { TypeWallPaper } from "./TypeWallPaper";
import { TypePeerStories } from "./TypePeerStories";
import { TypeBusinessWorkHours } from "./TypeBusinessWorkHours";
import { TypeBusinessLocation } from "./TypeBusinessLocation";
import { TypeBusinessGreetingMessage } from "./TypeBusinessGreetingMessage";
import { TypeBusinessAwayMessage } from "./TypeBusinessAwayMessage";
import { TypeBusinessIntro } from "./TypeBusinessIntro";
import { TypeBirthday } from "./TypeBirthday";
import { TypeStarRefProgram } from "./TypeStarRefProgram";
import { TypeBotVerification } from "./TypeBotVerification";
import { TypeDisallowedGiftsSettings } from "./TypeDisallowedGiftsSettings";
import { TypeStarsRating } from "./TypeStarsRating";
import { TypeProfileTab } from "./TypeProfileTab";
import { TypeDocument } from "./TypeDocument";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class UserFull extends TLObject {
    static CONSTRUCTOR_ID = 2687222078;
    static SUBCLASS_OF_ID = 524706233;
    static className = "UserFull";
    static classType = "constructor";

    flags!: number;
    blocked?: boolean;
    phoneCallsAvailable?: boolean;
    phoneCallsPrivate?: boolean;
    canPinMessage?: boolean;
    hasScheduled?: boolean;
    videoCallsAvailable?: boolean;
    voiceMessagesForbidden?: boolean;
    translationsDisabled?: boolean;
    storiesPinnedAvailable?: boolean;
    blockedMyStoriesFrom?: boolean;
    wallpaperOverridden?: boolean;
    contactRequirePremium?: boolean;
    readDatesPrivate?: boolean;
    flags2!: number;
    sponsoredEnabled?: boolean;
    canViewRevenue?: boolean;
    botCanManageEmojiStatus?: boolean;
    displayGiftsButton?: boolean;
    id!: bigint;
    about?: string;
    settings!: TypePeerSettings;
    personalPhoto?: TypePhoto;
    profilePhoto?: TypePhoto;
    fallbackPhoto?: TypePhoto;
    notifySettings!: TypePeerNotifySettings;
    botInfo?: TypeBotInfo;
    pinnedMsgId?: number;
    commonChatsCount!: number;
    folderId?: number;
    ttlPeriod?: number;
    theme?: TypeChatTheme;
    privateForwardName?: string;
    botGroupAdminRights?: TypeChatAdminRights;
    botBroadcastAdminRights?: TypeChatAdminRights;
    wallpaper?: TypeWallPaper;
    stories?: TypePeerStories;
    businessWorkHours?: TypeBusinessWorkHours;
    businessLocation?: TypeBusinessLocation;
    businessGreetingMessage?: TypeBusinessGreetingMessage;
    businessAwayMessage?: TypeBusinessAwayMessage;
    businessIntro?: TypeBusinessIntro;
    birthday?: TypeBirthday;
    personalChannelId?: bigint;
    personalChannelMessage?: number;
    stargiftsCount?: number;
    starrefProgram?: TypeStarRefProgram;
    botVerification?: TypeBotVerification;
    sendPaidMessagesStars?: bigint;
    disallowedGifts?: TypeDisallowedGiftsSettings;
    starsRating?: TypeStarsRating;
    starsMyPendingRating?: TypeStarsRating;
    starsMyPendingRatingDate?: number;
    mainTab?: TypeProfileTab;
    savedMusic?: TypeDocument;
    note?: TypeTextWithEntities;

    constructor(args: { flags?: number, blocked?: boolean, phoneCallsAvailable?: boolean, phoneCallsPrivate?: boolean, canPinMessage?: boolean, hasScheduled?: boolean, videoCallsAvailable?: boolean, voiceMessagesForbidden?: boolean, translationsDisabled?: boolean, storiesPinnedAvailable?: boolean, blockedMyStoriesFrom?: boolean, wallpaperOverridden?: boolean, contactRequirePremium?: boolean, readDatesPrivate?: boolean, flags2?: number, sponsoredEnabled?: boolean, canViewRevenue?: boolean, botCanManageEmojiStatus?: boolean, displayGiftsButton?: boolean, id?: bigint, about?: string, settings?: TypePeerSettings, personalPhoto?: TypePhoto, profilePhoto?: TypePhoto, fallbackPhoto?: TypePhoto, notifySettings?: TypePeerNotifySettings, botInfo?: TypeBotInfo, pinnedMsgId?: number, commonChatsCount?: number, folderId?: number, ttlPeriod?: number, theme?: TypeChatTheme, privateForwardName?: string, botGroupAdminRights?: TypeChatAdminRights, botBroadcastAdminRights?: TypeChatAdminRights, wallpaper?: TypeWallPaper, stories?: TypePeerStories, businessWorkHours?: TypeBusinessWorkHours, businessLocation?: TypeBusinessLocation, businessGreetingMessage?: TypeBusinessGreetingMessage, businessAwayMessage?: TypeBusinessAwayMessage, businessIntro?: TypeBusinessIntro, birthday?: TypeBirthday, personalChannelId?: bigint, personalChannelMessage?: number, stargiftsCount?: number, starrefProgram?: TypeStarRefProgram, botVerification?: TypeBotVerification, sendPaidMessagesStars?: bigint, disallowedGifts?: TypeDisallowedGiftsSettings, starsRating?: TypeStarsRating, starsMyPendingRating?: TypeStarsRating, starsMyPendingRatingDate?: number, mainTab?: TypeProfileTab, savedMusic?: TypeDocument, note?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.blocked = args.blocked;
        this.phoneCallsAvailable = args.phoneCallsAvailable;
        this.phoneCallsPrivate = args.phoneCallsPrivate;
        this.canPinMessage = args.canPinMessage;
        this.hasScheduled = args.hasScheduled;
        this.videoCallsAvailable = args.videoCallsAvailable;
        this.voiceMessagesForbidden = args.voiceMessagesForbidden;
        this.translationsDisabled = args.translationsDisabled;
        this.storiesPinnedAvailable = args.storiesPinnedAvailable;
        this.blockedMyStoriesFrom = args.blockedMyStoriesFrom;
        this.wallpaperOverridden = args.wallpaperOverridden;
        this.contactRequirePremium = args.contactRequirePremium;
        this.readDatesPrivate = args.readDatesPrivate;
        this.flags2 = args.flags2!;
        this.sponsoredEnabled = args.sponsoredEnabled;
        this.canViewRevenue = args.canViewRevenue;
        this.botCanManageEmojiStatus = args.botCanManageEmojiStatus;
        this.displayGiftsButton = args.displayGiftsButton;
        this.id = args.id!;
        this.about = args.about;
        this.settings = args.settings!;
        this.personalPhoto = args.personalPhoto;
        this.profilePhoto = args.profilePhoto;
        this.fallbackPhoto = args.fallbackPhoto;
        this.notifySettings = args.notifySettings!;
        this.botInfo = args.botInfo;
        this.pinnedMsgId = args.pinnedMsgId;
        this.commonChatsCount = args.commonChatsCount!;
        this.folderId = args.folderId;
        this.ttlPeriod = args.ttlPeriod;
        this.theme = args.theme;
        this.privateForwardName = args.privateForwardName;
        this.botGroupAdminRights = args.botGroupAdminRights;
        this.botBroadcastAdminRights = args.botBroadcastAdminRights;
        this.wallpaper = args.wallpaper;
        this.stories = args.stories;
        this.businessWorkHours = args.businessWorkHours;
        this.businessLocation = args.businessLocation;
        this.businessGreetingMessage = args.businessGreetingMessage;
        this.businessAwayMessage = args.businessAwayMessage;
        this.businessIntro = args.businessIntro;
        this.birthday = args.birthday;
        this.personalChannelId = args.personalChannelId;
        this.personalChannelMessage = args.personalChannelMessage;
        this.stargiftsCount = args.stargiftsCount;
        this.starrefProgram = args.starrefProgram;
        this.botVerification = args.botVerification;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
        this.disallowedGifts = args.disallowedGifts;
        this.starsRating = args.starsRating;
        this.starsMyPendingRating = args.starsMyPendingRating;
        this.starsMyPendingRatingDate = args.starsMyPendingRatingDate;
        this.mainTab = args.mainTab;
        this.savedMusic = args.savedMusic;
        this.note = args.note;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2687222078, false);
        let flags = 0;
        if (this.blocked) { flags |= 1 << 0; }
        if (this.phoneCallsAvailable) { flags |= 1 << 4; }
        if (this.phoneCallsPrivate) { flags |= 1 << 5; }
        if (this.canPinMessage) { flags |= 1 << 7; }
        if (this.hasScheduled) { flags |= 1 << 12; }
        if (this.videoCallsAvailable) { flags |= 1 << 13; }
        if (this.voiceMessagesForbidden) { flags |= 1 << 20; }
        if (this.translationsDisabled) { flags |= 1 << 23; }
        if (this.storiesPinnedAvailable) { flags |= 1 << 26; }
        if (this.blockedMyStoriesFrom) { flags |= 1 << 27; }
        if (this.wallpaperOverridden) { flags |= 1 << 28; }
        if (this.contactRequirePremium) { flags |= 1 << 29; }
        if (this.readDatesPrivate) { flags |= 1 << 30; }
        if (this.about !== undefined && this.about !== null) { flags |= 1 << 1; }
        if (this.personalPhoto !== undefined && this.personalPhoto !== null) { flags |= 1 << 21; }
        if (this.profilePhoto !== undefined && this.profilePhoto !== null) { flags |= 1 << 2; }
        if (this.fallbackPhoto !== undefined && this.fallbackPhoto !== null) { flags |= 1 << 22; }
        if (this.botInfo !== undefined && this.botInfo !== null) { flags |= 1 << 3; }
        if (this.pinnedMsgId !== undefined && this.pinnedMsgId !== null) { flags |= 1 << 6; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 11; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 14; }
        if (this.theme !== undefined && this.theme !== null) { flags |= 1 << 15; }
        if (this.privateForwardName !== undefined && this.privateForwardName !== null) { flags |= 1 << 16; }
        if (this.botGroupAdminRights !== undefined && this.botGroupAdminRights !== null) { flags |= 1 << 17; }
        if (this.botBroadcastAdminRights !== undefined && this.botBroadcastAdminRights !== null) { flags |= 1 << 18; }
        if (this.wallpaper !== undefined && this.wallpaper !== null) { flags |= 1 << 24; }
        if (this.stories !== undefined && this.stories !== null) { flags |= 1 << 25; }
        writer.writeInt(flags, false);
        let flags2 = 0;
        if (this.sponsoredEnabled) { flags2 |= 1 << 7; }
        if (this.canViewRevenue) { flags2 |= 1 << 9; }
        if (this.botCanManageEmojiStatus) { flags2 |= 1 << 10; }
        if (this.displayGiftsButton) { flags2 |= 1 << 16; }
        if (this.businessWorkHours !== undefined && this.businessWorkHours !== null) { flags2 |= 1 << 0; }
        if (this.businessLocation !== undefined && this.businessLocation !== null) { flags2 |= 1 << 1; }
        if (this.businessGreetingMessage !== undefined && this.businessGreetingMessage !== null) { flags2 |= 1 << 2; }
        if (this.businessAwayMessage !== undefined && this.businessAwayMessage !== null) { flags2 |= 1 << 3; }
        if (this.businessIntro !== undefined && this.businessIntro !== null) { flags2 |= 1 << 4; }
        if (this.birthday !== undefined && this.birthday !== null) { flags2 |= 1 << 5; }
        if (this.personalChannelId !== undefined && this.personalChannelId !== null) { flags2 |= 1 << 6; }
        if (this.personalChannelMessage !== undefined && this.personalChannelMessage !== null) { flags2 |= 1 << 6; }
        if (this.stargiftsCount !== undefined && this.stargiftsCount !== null) { flags2 |= 1 << 8; }
        if (this.starrefProgram !== undefined && this.starrefProgram !== null) { flags2 |= 1 << 11; }
        if (this.botVerification !== undefined && this.botVerification !== null) { flags2 |= 1 << 12; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags2 |= 1 << 14; }
        if (this.disallowedGifts !== undefined && this.disallowedGifts !== null) { flags2 |= 1 << 15; }
        if (this.starsRating !== undefined && this.starsRating !== null) { flags2 |= 1 << 17; }
        if (this.starsMyPendingRating !== undefined && this.starsMyPendingRating !== null) { flags2 |= 1 << 18; }
        if (this.starsMyPendingRatingDate !== undefined && this.starsMyPendingRatingDate !== null) { flags2 |= 1 << 18; }
        if (this.mainTab !== undefined && this.mainTab !== null) { flags2 |= 1 << 20; }
        if (this.savedMusic !== undefined && this.savedMusic !== null) { flags2 |= 1 << 21; }
        if (this.note !== undefined && this.note !== null) { flags2 |= 1 << 22; }
        writer.writeInt(flags2, false);
        if (this.blocked !== undefined && this.blocked !== null) {
        }
        if (this.phoneCallsAvailable !== undefined && this.phoneCallsAvailable !== null) {
        }
        if (this.phoneCallsPrivate !== undefined && this.phoneCallsPrivate !== null) {
        }
        if (this.canPinMessage !== undefined && this.canPinMessage !== null) {
        }
        if (this.hasScheduled !== undefined && this.hasScheduled !== null) {
        }
        if (this.videoCallsAvailable !== undefined && this.videoCallsAvailable !== null) {
        }
        if (this.voiceMessagesForbidden !== undefined && this.voiceMessagesForbidden !== null) {
        }
        if (this.translationsDisabled !== undefined && this.translationsDisabled !== null) {
        }
        if (this.storiesPinnedAvailable !== undefined && this.storiesPinnedAvailable !== null) {
        }
        if (this.blockedMyStoriesFrom !== undefined && this.blockedMyStoriesFrom !== null) {
        }
        if (this.wallpaperOverridden !== undefined && this.wallpaperOverridden !== null) {
        }
        if (this.contactRequirePremium !== undefined && this.contactRequirePremium !== null) {
        }
        if (this.readDatesPrivate !== undefined && this.readDatesPrivate !== null) {
        }
        if (this.sponsoredEnabled !== undefined && this.sponsoredEnabled !== null) {
        }
        if (this.canViewRevenue !== undefined && this.canViewRevenue !== null) {
        }
        if (this.botCanManageEmojiStatus !== undefined && this.botCanManageEmojiStatus !== null) {
        }
        if (this.displayGiftsButton !== undefined && this.displayGiftsButton !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        if (this.about !== undefined && this.about !== null) {
            writer.tgWriteString(this.about);
        }
        writer.write(this.settings.getBytes());
        if (this.personalPhoto !== undefined && this.personalPhoto !== null) {
            writer.write(this.personalPhoto.getBytes());
        }
        if (this.profilePhoto !== undefined && this.profilePhoto !== null) {
            writer.write(this.profilePhoto.getBytes());
        }
        if (this.fallbackPhoto !== undefined && this.fallbackPhoto !== null) {
            writer.write(this.fallbackPhoto.getBytes());
        }
        writer.write(this.notifySettings.getBytes());
        if (this.botInfo !== undefined && this.botInfo !== null) {
            writer.write(this.botInfo.getBytes());
        }
        if (this.pinnedMsgId !== undefined && this.pinnedMsgId !== null) {
            writer.writeInt(this.pinnedMsgId);
        }
        writer.writeInt(this.commonChatsCount);
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
        }
        if (this.theme !== undefined && this.theme !== null) {
            writer.write(this.theme.getBytes());
        }
        if (this.privateForwardName !== undefined && this.privateForwardName !== null) {
            writer.tgWriteString(this.privateForwardName);
        }
        if (this.botGroupAdminRights !== undefined && this.botGroupAdminRights !== null) {
            writer.write(this.botGroupAdminRights.getBytes());
        }
        if (this.botBroadcastAdminRights !== undefined && this.botBroadcastAdminRights !== null) {
            writer.write(this.botBroadcastAdminRights.getBytes());
        }
        if (this.wallpaper !== undefined && this.wallpaper !== null) {
            writer.write(this.wallpaper.getBytes());
        }
        if (this.stories !== undefined && this.stories !== null) {
            writer.write(this.stories.getBytes());
        }
        if (this.businessWorkHours !== undefined && this.businessWorkHours !== null) {
            writer.write(this.businessWorkHours.getBytes());
        }
        if (this.businessLocation !== undefined && this.businessLocation !== null) {
            writer.write(this.businessLocation.getBytes());
        }
        if (this.businessGreetingMessage !== undefined && this.businessGreetingMessage !== null) {
            writer.write(this.businessGreetingMessage.getBytes());
        }
        if (this.businessAwayMessage !== undefined && this.businessAwayMessage !== null) {
            writer.write(this.businessAwayMessage.getBytes());
        }
        if (this.businessIntro !== undefined && this.businessIntro !== null) {
            writer.write(this.businessIntro.getBytes());
        }
        if (this.birthday !== undefined && this.birthday !== null) {
            writer.write(this.birthday.getBytes());
        }
        if (this.personalChannelId !== undefined && this.personalChannelId !== null) {
            writer.writeLargeInt(this.personalChannelId, 64);
        }
        if (this.personalChannelMessage !== undefined && this.personalChannelMessage !== null) {
            writer.writeInt(this.personalChannelMessage);
        }
        if (this.stargiftsCount !== undefined && this.stargiftsCount !== null) {
            writer.writeInt(this.stargiftsCount);
        }
        if (this.starrefProgram !== undefined && this.starrefProgram !== null) {
            writer.write(this.starrefProgram.getBytes());
        }
        if (this.botVerification !== undefined && this.botVerification !== null) {
            writer.write(this.botVerification.getBytes());
        }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) {
            writer.writeLargeInt(this.sendPaidMessagesStars, 64);
        }
        if (this.disallowedGifts !== undefined && this.disallowedGifts !== null) {
            writer.write(this.disallowedGifts.getBytes());
        }
        if (this.starsRating !== undefined && this.starsRating !== null) {
            writer.write(this.starsRating.getBytes());
        }
        if (this.starsMyPendingRating !== undefined && this.starsMyPendingRating !== null) {
            writer.write(this.starsMyPendingRating.getBytes());
        }
        if (this.starsMyPendingRatingDate !== undefined && this.starsMyPendingRatingDate !== null) {
            writer.writeInt(this.starsMyPendingRatingDate);
        }
        if (this.mainTab !== undefined && this.mainTab !== null) {
            writer.write(this.mainTab.getBytes());
        }
        if (this.savedMusic !== undefined && this.savedMusic !== null) {
            writer.write(this.savedMusic.getBytes());
        }
        if (this.note !== undefined && this.note !== null) {
            writer.write(this.note.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserFull {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _blocked = true;
            args.blocked = _blocked;
        } else {
            args.blocked = false;
        }
        if (args.flags & (1 << 4)) {
            const _phoneCallsAvailable = true;
            args.phoneCallsAvailable = _phoneCallsAvailable;
        } else {
            args.phoneCallsAvailable = false;
        }
        if (args.flags & (1 << 5)) {
            const _phoneCallsPrivate = true;
            args.phoneCallsPrivate = _phoneCallsPrivate;
        } else {
            args.phoneCallsPrivate = false;
        }
        if (args.flags & (1 << 7)) {
            const _canPinMessage = true;
            args.canPinMessage = _canPinMessage;
        } else {
            args.canPinMessage = false;
        }
        if (args.flags & (1 << 12)) {
            const _hasScheduled = true;
            args.hasScheduled = _hasScheduled;
        } else {
            args.hasScheduled = false;
        }
        if (args.flags & (1 << 13)) {
            const _videoCallsAvailable = true;
            args.videoCallsAvailable = _videoCallsAvailable;
        } else {
            args.videoCallsAvailable = false;
        }
        if (args.flags & (1 << 20)) {
            const _voiceMessagesForbidden = true;
            args.voiceMessagesForbidden = _voiceMessagesForbidden;
        } else {
            args.voiceMessagesForbidden = false;
        }
        if (args.flags & (1 << 23)) {
            const _translationsDisabled = true;
            args.translationsDisabled = _translationsDisabled;
        } else {
            args.translationsDisabled = false;
        }
        if (args.flags & (1 << 26)) {
            const _storiesPinnedAvailable = true;
            args.storiesPinnedAvailable = _storiesPinnedAvailable;
        } else {
            args.storiesPinnedAvailable = false;
        }
        if (args.flags & (1 << 27)) {
            const _blockedMyStoriesFrom = true;
            args.blockedMyStoriesFrom = _blockedMyStoriesFrom;
        } else {
            args.blockedMyStoriesFrom = false;
        }
        if (args.flags & (1 << 28)) {
            const _wallpaperOverridden = true;
            args.wallpaperOverridden = _wallpaperOverridden;
        } else {
            args.wallpaperOverridden = false;
        }
        if (args.flags & (1 << 29)) {
            const _contactRequirePremium = true;
            args.contactRequirePremium = _contactRequirePremium;
        } else {
            args.contactRequirePremium = false;
        }
        if (args.flags & (1 << 30)) {
            const _readDatesPrivate = true;
            args.readDatesPrivate = _readDatesPrivate;
        } else {
            args.readDatesPrivate = false;
        }
        const _flags2 = reader.readInt();
        args.flags2 = _flags2;
        if (args.flags2 & (1 << 7)) {
            const _sponsoredEnabled = true;
            args.sponsoredEnabled = _sponsoredEnabled;
        } else {
            args.sponsoredEnabled = false;
        }
        if (args.flags2 & (1 << 9)) {
            const _canViewRevenue = true;
            args.canViewRevenue = _canViewRevenue;
        } else {
            args.canViewRevenue = false;
        }
        if (args.flags2 & (1 << 10)) {
            const _botCanManageEmojiStatus = true;
            args.botCanManageEmojiStatus = _botCanManageEmojiStatus;
        } else {
            args.botCanManageEmojiStatus = false;
        }
        if (args.flags2 & (1 << 16)) {
            const _displayGiftsButton = true;
            args.displayGiftsButton = _displayGiftsButton;
        } else {
            args.displayGiftsButton = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        if (args.flags & (1 << 1)) {
            const _about = reader.tgReadString();
            args.about = _about;
        } else {
            args.about = undefined;
        }
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        if (args.flags & (1 << 21)) {
            const _personalPhoto = reader.tgReadObject();
            args.personalPhoto = _personalPhoto;
        } else {
            args.personalPhoto = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _profilePhoto = reader.tgReadObject();
            args.profilePhoto = _profilePhoto;
        } else {
            args.profilePhoto = undefined;
        }
        if (args.flags & (1 << 22)) {
            const _fallbackPhoto = reader.tgReadObject();
            args.fallbackPhoto = _fallbackPhoto;
        } else {
            args.fallbackPhoto = undefined;
        }
        const _notifySettings = reader.tgReadObject();
        args.notifySettings = _notifySettings;
        if (args.flags & (1 << 3)) {
            const _botInfo = reader.tgReadObject();
            args.botInfo = _botInfo;
        } else {
            args.botInfo = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _pinnedMsgId = reader.readInt();
            args.pinnedMsgId = _pinnedMsgId;
        } else {
            args.pinnedMsgId = undefined;
        }
        const _commonChatsCount = reader.readInt();
        args.commonChatsCount = _commonChatsCount;
        if (args.flags & (1 << 11)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _theme = reader.tgReadObject();
            args.theme = _theme;
        } else {
            args.theme = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _privateForwardName = reader.tgReadString();
            args.privateForwardName = _privateForwardName;
        } else {
            args.privateForwardName = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _botGroupAdminRights = reader.tgReadObject();
            args.botGroupAdminRights = _botGroupAdminRights;
        } else {
            args.botGroupAdminRights = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _botBroadcastAdminRights = reader.tgReadObject();
            args.botBroadcastAdminRights = _botBroadcastAdminRights;
        } else {
            args.botBroadcastAdminRights = undefined;
        }
        if (args.flags & (1 << 24)) {
            const _wallpaper = reader.tgReadObject();
            args.wallpaper = _wallpaper;
        } else {
            args.wallpaper = undefined;
        }
        if (args.flags & (1 << 25)) {
            const _stories = reader.tgReadObject();
            args.stories = _stories;
        } else {
            args.stories = undefined;
        }
        if (args.flags2 & (1 << 0)) {
            const _businessWorkHours = reader.tgReadObject();
            args.businessWorkHours = _businessWorkHours;
        } else {
            args.businessWorkHours = undefined;
        }
        if (args.flags2 & (1 << 1)) {
            const _businessLocation = reader.tgReadObject();
            args.businessLocation = _businessLocation;
        } else {
            args.businessLocation = undefined;
        }
        if (args.flags2 & (1 << 2)) {
            const _businessGreetingMessage = reader.tgReadObject();
            args.businessGreetingMessage = _businessGreetingMessage;
        } else {
            args.businessGreetingMessage = undefined;
        }
        if (args.flags2 & (1 << 3)) {
            const _businessAwayMessage = reader.tgReadObject();
            args.businessAwayMessage = _businessAwayMessage;
        } else {
            args.businessAwayMessage = undefined;
        }
        if (args.flags2 & (1 << 4)) {
            const _businessIntro = reader.tgReadObject();
            args.businessIntro = _businessIntro;
        } else {
            args.businessIntro = undefined;
        }
        if (args.flags2 & (1 << 5)) {
            const _birthday = reader.tgReadObject();
            args.birthday = _birthday;
        } else {
            args.birthday = undefined;
        }
        if (args.flags2 & (1 << 6)) {
            const _personalChannelId = reader.readLargeInt(64);
            args.personalChannelId = _personalChannelId;
        } else {
            args.personalChannelId = undefined;
        }
        if (args.flags2 & (1 << 6)) {
            const _personalChannelMessage = reader.readInt();
            args.personalChannelMessage = _personalChannelMessage;
        } else {
            args.personalChannelMessage = undefined;
        }
        if (args.flags2 & (1 << 8)) {
            const _stargiftsCount = reader.readInt();
            args.stargiftsCount = _stargiftsCount;
        } else {
            args.stargiftsCount = undefined;
        }
        if (args.flags2 & (1 << 11)) {
            const _starrefProgram = reader.tgReadObject();
            args.starrefProgram = _starrefProgram;
        } else {
            args.starrefProgram = undefined;
        }
        if (args.flags2 & (1 << 12)) {
            const _botVerification = reader.tgReadObject();
            args.botVerification = _botVerification;
        } else {
            args.botVerification = undefined;
        }
        if (args.flags2 & (1 << 14)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        if (args.flags2 & (1 << 15)) {
            const _disallowedGifts = reader.tgReadObject();
            args.disallowedGifts = _disallowedGifts;
        } else {
            args.disallowedGifts = undefined;
        }
        if (args.flags2 & (1 << 17)) {
            const _starsRating = reader.tgReadObject();
            args.starsRating = _starsRating;
        } else {
            args.starsRating = undefined;
        }
        if (args.flags2 & (1 << 18)) {
            const _starsMyPendingRating = reader.tgReadObject();
            args.starsMyPendingRating = _starsMyPendingRating;
        } else {
            args.starsMyPendingRating = undefined;
        }
        if (args.flags2 & (1 << 18)) {
            const _starsMyPendingRatingDate = reader.readInt();
            args.starsMyPendingRatingDate = _starsMyPendingRatingDate;
        } else {
            args.starsMyPendingRatingDate = undefined;
        }
        if (args.flags2 & (1 << 20)) {
            const _mainTab = reader.tgReadObject();
            args.mainTab = _mainTab;
        } else {
            args.mainTab = undefined;
        }
        if (args.flags2 & (1 << 21)) {
            const _savedMusic = reader.tgReadObject();
            args.savedMusic = _savedMusic;
        } else {
            args.savedMusic = undefined;
        }
        if (args.flags2 & (1 << 22)) {
            const _note = reader.tgReadObject();
            args.note = _note;
        } else {
            args.note = undefined;
        }
        return new UserFull(args);
    }
}