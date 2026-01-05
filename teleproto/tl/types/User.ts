import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeUserProfilePhoto } from "./TypeUserProfilePhoto";
import { TypeUserStatus } from "./TypeUserStatus";
import { TypeRestrictionReason } from "./TypeRestrictionReason";
import { TypeEmojiStatus } from "./TypeEmojiStatus";
import { TypeUsername } from "./TypeUsername";
import { TypeRecentStory } from "./TypeRecentStory";
import { TypePeerColor } from "./TypePeerColor";

export class User extends TLObject {
    static CONSTRUCTOR_ID = 829899656;
    static SUBCLASS_OF_ID = 765557111;
    static className = "User";
    static classType = "constructor";

    flags!: number;
    self?: boolean;
    contact?: boolean;
    mutualContact?: boolean;
    deleted?: boolean;
    bot?: boolean;
    botChatHistory?: boolean;
    botNochats?: boolean;
    verified?: boolean;
    restricted?: boolean;
    min?: boolean;
    botInlineGeo?: boolean;
    support?: boolean;
    scam?: boolean;
    applyMinPhoto?: boolean;
    fake?: boolean;
    botAttachMenu?: boolean;
    premium?: boolean;
    attachMenuEnabled?: boolean;
    flags2!: number;
    botCanEdit?: boolean;
    closeFriend?: boolean;
    storiesHidden?: boolean;
    storiesUnavailable?: boolean;
    contactRequirePremium?: boolean;
    botBusiness?: boolean;
    botHasMainApp?: boolean;
    botForumView?: boolean;
    id!: bigint;
    accessHash?: bigint;
    firstName?: string;
    lastName?: string;
    username?: string;
    phone?: string;
    photo?: TypeUserProfilePhoto;
    status?: TypeUserStatus;
    botInfoVersion?: number;
    restrictionReason?: TypeRestrictionReason[];
    botInlinePlaceholder?: string;
    langCode?: string;
    emojiStatus?: TypeEmojiStatus;
    usernames?: TypeUsername[];
    storiesMaxId?: TypeRecentStory;
    color?: TypePeerColor;
    profileColor?: TypePeerColor;
    botActiveUsers?: number;
    botVerificationIcon?: bigint;
    sendPaidMessagesStars?: bigint;

    constructor(args: { flags?: number, self?: boolean, contact?: boolean, mutualContact?: boolean, deleted?: boolean, bot?: boolean, botChatHistory?: boolean, botNochats?: boolean, verified?: boolean, restricted?: boolean, min?: boolean, botInlineGeo?: boolean, support?: boolean, scam?: boolean, applyMinPhoto?: boolean, fake?: boolean, botAttachMenu?: boolean, premium?: boolean, attachMenuEnabled?: boolean, flags2?: number, botCanEdit?: boolean, closeFriend?: boolean, storiesHidden?: boolean, storiesUnavailable?: boolean, contactRequirePremium?: boolean, botBusiness?: boolean, botHasMainApp?: boolean, botForumView?: boolean, id?: bigint, accessHash?: bigint, firstName?: string, lastName?: string, username?: string, phone?: string, photo?: TypeUserProfilePhoto, status?: TypeUserStatus, botInfoVersion?: number, restrictionReason?: TypeRestrictionReason[], botInlinePlaceholder?: string, langCode?: string, emojiStatus?: TypeEmojiStatus, usernames?: TypeUsername[], storiesMaxId?: TypeRecentStory, color?: TypePeerColor, profileColor?: TypePeerColor, botActiveUsers?: number, botVerificationIcon?: bigint, sendPaidMessagesStars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.self = args.self;
        this.contact = args.contact;
        this.mutualContact = args.mutualContact;
        this.deleted = args.deleted;
        this.bot = args.bot;
        this.botChatHistory = args.botChatHistory;
        this.botNochats = args.botNochats;
        this.verified = args.verified;
        this.restricted = args.restricted;
        this.min = args.min;
        this.botInlineGeo = args.botInlineGeo;
        this.support = args.support;
        this.scam = args.scam;
        this.applyMinPhoto = args.applyMinPhoto;
        this.fake = args.fake;
        this.botAttachMenu = args.botAttachMenu;
        this.premium = args.premium;
        this.attachMenuEnabled = args.attachMenuEnabled;
        this.flags2 = args.flags2!;
        this.botCanEdit = args.botCanEdit;
        this.closeFriend = args.closeFriend;
        this.storiesHidden = args.storiesHidden;
        this.storiesUnavailable = args.storiesUnavailable;
        this.contactRequirePremium = args.contactRequirePremium;
        this.botBusiness = args.botBusiness;
        this.botHasMainApp = args.botHasMainApp;
        this.botForumView = args.botForumView;
        this.id = args.id!;
        this.accessHash = args.accessHash;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.username = args.username;
        this.phone = args.phone;
        this.photo = args.photo;
        this.status = args.status;
        this.botInfoVersion = args.botInfoVersion;
        this.restrictionReason = args.restrictionReason;
        this.botInlinePlaceholder = args.botInlinePlaceholder;
        this.langCode = args.langCode;
        this.emojiStatus = args.emojiStatus;
        this.usernames = args.usernames;
        this.storiesMaxId = args.storiesMaxId;
        this.color = args.color;
        this.profileColor = args.profileColor;
        this.botActiveUsers = args.botActiveUsers;
        this.botVerificationIcon = args.botVerificationIcon;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(829899656, false);
        let flags = 0;
        if (this.self) { flags |= 1 << 10; }
        if (this.contact) { flags |= 1 << 11; }
        if (this.mutualContact) { flags |= 1 << 12; }
        if (this.deleted) { flags |= 1 << 13; }
        if (this.bot) { flags |= 1 << 14; }
        if (this.botChatHistory) { flags |= 1 << 15; }
        if (this.botNochats) { flags |= 1 << 16; }
        if (this.verified) { flags |= 1 << 17; }
        if (this.restricted) { flags |= 1 << 18; }
        if (this.min) { flags |= 1 << 20; }
        if (this.botInlineGeo) { flags |= 1 << 21; }
        if (this.support) { flags |= 1 << 23; }
        if (this.scam) { flags |= 1 << 24; }
        if (this.applyMinPhoto) { flags |= 1 << 25; }
        if (this.fake) { flags |= 1 << 26; }
        if (this.botAttachMenu) { flags |= 1 << 27; }
        if (this.premium) { flags |= 1 << 28; }
        if (this.attachMenuEnabled) { flags |= 1 << 29; }
        if (this.accessHash !== undefined && this.accessHash !== null) { flags |= 1 << 0; }
        if (this.firstName !== undefined && this.firstName !== null) { flags |= 1 << 1; }
        if (this.lastName !== undefined && this.lastName !== null) { flags |= 1 << 2; }
        if (this.username !== undefined && this.username !== null) { flags |= 1 << 3; }
        if (this.phone !== undefined && this.phone !== null) { flags |= 1 << 4; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 5; }
        if (this.status !== undefined && this.status !== null) { flags |= 1 << 6; }
        if (this.botInfoVersion !== undefined && this.botInfoVersion !== null) { flags |= 1 << 14; }
        if (this.restrictionReason !== undefined && this.restrictionReason !== null) { flags |= 1 << 18; }
        if (this.botInlinePlaceholder !== undefined && this.botInlinePlaceholder !== null) { flags |= 1 << 19; }
        if (this.langCode !== undefined && this.langCode !== null) { flags |= 1 << 22; }
        if (this.emojiStatus !== undefined && this.emojiStatus !== null) { flags |= 1 << 30; }
        writer.writeInt(flags, false);
        let flags2 = 0;
        if (this.botCanEdit) { flags2 |= 1 << 1; }
        if (this.closeFriend) { flags2 |= 1 << 2; }
        if (this.storiesHidden) { flags2 |= 1 << 3; }
        if (this.storiesUnavailable) { flags2 |= 1 << 4; }
        if (this.contactRequirePremium) { flags2 |= 1 << 10; }
        if (this.botBusiness) { flags2 |= 1 << 11; }
        if (this.botHasMainApp) { flags2 |= 1 << 13; }
        if (this.botForumView) { flags2 |= 1 << 16; }
        if (this.usernames !== undefined && this.usernames !== null) { flags2 |= 1 << 0; }
        if (this.storiesMaxId !== undefined && this.storiesMaxId !== null) { flags2 |= 1 << 5; }
        if (this.color !== undefined && this.color !== null) { flags2 |= 1 << 8; }
        if (this.profileColor !== undefined && this.profileColor !== null) { flags2 |= 1 << 9; }
        if (this.botActiveUsers !== undefined && this.botActiveUsers !== null) { flags2 |= 1 << 12; }
        if (this.botVerificationIcon !== undefined && this.botVerificationIcon !== null) { flags2 |= 1 << 14; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags2 |= 1 << 15; }
        writer.writeInt(flags2, false);
        if (this.self !== undefined && this.self !== null) {
        }
        if (this.contact !== undefined && this.contact !== null) {
        }
        if (this.mutualContact !== undefined && this.mutualContact !== null) {
        }
        if (this.deleted !== undefined && this.deleted !== null) {
        }
        if (this.bot !== undefined && this.bot !== null) {
        }
        if (this.botChatHistory !== undefined && this.botChatHistory !== null) {
        }
        if (this.botNochats !== undefined && this.botNochats !== null) {
        }
        if (this.verified !== undefined && this.verified !== null) {
        }
        if (this.restricted !== undefined && this.restricted !== null) {
        }
        if (this.min !== undefined && this.min !== null) {
        }
        if (this.botInlineGeo !== undefined && this.botInlineGeo !== null) {
        }
        if (this.support !== undefined && this.support !== null) {
        }
        if (this.scam !== undefined && this.scam !== null) {
        }
        if (this.applyMinPhoto !== undefined && this.applyMinPhoto !== null) {
        }
        if (this.fake !== undefined && this.fake !== null) {
        }
        if (this.botAttachMenu !== undefined && this.botAttachMenu !== null) {
        }
        if (this.premium !== undefined && this.premium !== null) {
        }
        if (this.attachMenuEnabled !== undefined && this.attachMenuEnabled !== null) {
        }
        if (this.botCanEdit !== undefined && this.botCanEdit !== null) {
        }
        if (this.closeFriend !== undefined && this.closeFriend !== null) {
        }
        if (this.storiesHidden !== undefined && this.storiesHidden !== null) {
        }
        if (this.storiesUnavailable !== undefined && this.storiesUnavailable !== null) {
        }
        if (this.contactRequirePremium !== undefined && this.contactRequirePremium !== null) {
        }
        if (this.botBusiness !== undefined && this.botBusiness !== null) {
        }
        if (this.botHasMainApp !== undefined && this.botHasMainApp !== null) {
        }
        if (this.botForumView !== undefined && this.botForumView !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        if (this.accessHash !== undefined && this.accessHash !== null) {
            writer.writeLargeInt(this.accessHash, 64);
        }
        if (this.firstName !== undefined && this.firstName !== null) {
            writer.tgWriteString(this.firstName);
        }
        if (this.lastName !== undefined && this.lastName !== null) {
            writer.tgWriteString(this.lastName);
        }
        if (this.username !== undefined && this.username !== null) {
            writer.tgWriteString(this.username);
        }
        if (this.phone !== undefined && this.phone !== null) {
            writer.tgWriteString(this.phone);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.status !== undefined && this.status !== null) {
            writer.write(this.status.getBytes());
        }
        if (this.botInfoVersion !== undefined && this.botInfoVersion !== null) {
            writer.writeInt(this.botInfoVersion);
        }
        if (this.restrictionReason !== undefined && this.restrictionReason !== null) {
            writer.writeVector(this.restrictionReason, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.botInlinePlaceholder !== undefined && this.botInlinePlaceholder !== null) {
            writer.tgWriteString(this.botInlinePlaceholder);
        }
        if (this.langCode !== undefined && this.langCode !== null) {
            writer.tgWriteString(this.langCode);
        }
        if (this.emojiStatus !== undefined && this.emojiStatus !== null) {
            writer.write(this.emojiStatus.getBytes());
        }
        if (this.usernames !== undefined && this.usernames !== null) {
            writer.writeVector(this.usernames, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.storiesMaxId !== undefined && this.storiesMaxId !== null) {
            writer.write(this.storiesMaxId.getBytes());
        }
        if (this.color !== undefined && this.color !== null) {
            writer.write(this.color.getBytes());
        }
        if (this.profileColor !== undefined && this.profileColor !== null) {
            writer.write(this.profileColor.getBytes());
        }
        if (this.botActiveUsers !== undefined && this.botActiveUsers !== null) {
            writer.writeInt(this.botActiveUsers);
        }
        if (this.botVerificationIcon !== undefined && this.botVerificationIcon !== null) {
            writer.writeLargeInt(this.botVerificationIcon, 64);
        }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) {
            writer.writeLargeInt(this.sendPaidMessagesStars, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): User {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 10)) {
            const _self = true;
            args.self = _self;
        } else {
            args.self = false;
        }
        if (args.flags & (1 << 11)) {
            const _contact = true;
            args.contact = _contact;
        } else {
            args.contact = false;
        }
        if (args.flags & (1 << 12)) {
            const _mutualContact = true;
            args.mutualContact = _mutualContact;
        } else {
            args.mutualContact = false;
        }
        if (args.flags & (1 << 13)) {
            const _deleted = true;
            args.deleted = _deleted;
        } else {
            args.deleted = false;
        }
        if (args.flags & (1 << 14)) {
            const _bot = true;
            args.bot = _bot;
        } else {
            args.bot = false;
        }
        if (args.flags & (1 << 15)) {
            const _botChatHistory = true;
            args.botChatHistory = _botChatHistory;
        } else {
            args.botChatHistory = false;
        }
        if (args.flags & (1 << 16)) {
            const _botNochats = true;
            args.botNochats = _botNochats;
        } else {
            args.botNochats = false;
        }
        if (args.flags & (1 << 17)) {
            const _verified = true;
            args.verified = _verified;
        } else {
            args.verified = false;
        }
        if (args.flags & (1 << 18)) {
            const _restricted = true;
            args.restricted = _restricted;
        } else {
            args.restricted = false;
        }
        if (args.flags & (1 << 20)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        if (args.flags & (1 << 21)) {
            const _botInlineGeo = true;
            args.botInlineGeo = _botInlineGeo;
        } else {
            args.botInlineGeo = false;
        }
        if (args.flags & (1 << 23)) {
            const _support = true;
            args.support = _support;
        } else {
            args.support = false;
        }
        if (args.flags & (1 << 24)) {
            const _scam = true;
            args.scam = _scam;
        } else {
            args.scam = false;
        }
        if (args.flags & (1 << 25)) {
            const _applyMinPhoto = true;
            args.applyMinPhoto = _applyMinPhoto;
        } else {
            args.applyMinPhoto = false;
        }
        if (args.flags & (1 << 26)) {
            const _fake = true;
            args.fake = _fake;
        } else {
            args.fake = false;
        }
        if (args.flags & (1 << 27)) {
            const _botAttachMenu = true;
            args.botAttachMenu = _botAttachMenu;
        } else {
            args.botAttachMenu = false;
        }
        if (args.flags & (1 << 28)) {
            const _premium = true;
            args.premium = _premium;
        } else {
            args.premium = false;
        }
        if (args.flags & (1 << 29)) {
            const _attachMenuEnabled = true;
            args.attachMenuEnabled = _attachMenuEnabled;
        } else {
            args.attachMenuEnabled = false;
        }
        const _flags2 = reader.readInt();
        args.flags2 = _flags2;
        if (args.flags2 & (1 << 1)) {
            const _botCanEdit = true;
            args.botCanEdit = _botCanEdit;
        } else {
            args.botCanEdit = false;
        }
        if (args.flags2 & (1 << 2)) {
            const _closeFriend = true;
            args.closeFriend = _closeFriend;
        } else {
            args.closeFriend = false;
        }
        if (args.flags2 & (1 << 3)) {
            const _storiesHidden = true;
            args.storiesHidden = _storiesHidden;
        } else {
            args.storiesHidden = false;
        }
        if (args.flags2 & (1 << 4)) {
            const _storiesUnavailable = true;
            args.storiesUnavailable = _storiesUnavailable;
        } else {
            args.storiesUnavailable = false;
        }
        if (args.flags2 & (1 << 10)) {
            const _contactRequirePremium = true;
            args.contactRequirePremium = _contactRequirePremium;
        } else {
            args.contactRequirePremium = false;
        }
        if (args.flags2 & (1 << 11)) {
            const _botBusiness = true;
            args.botBusiness = _botBusiness;
        } else {
            args.botBusiness = false;
        }
        if (args.flags2 & (1 << 13)) {
            const _botHasMainApp = true;
            args.botHasMainApp = _botHasMainApp;
        } else {
            args.botHasMainApp = false;
        }
        if (args.flags2 & (1 << 16)) {
            const _botForumView = true;
            args.botForumView = _botForumView;
        } else {
            args.botForumView = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _accessHash = reader.readLargeInt(64);
            args.accessHash = _accessHash;
        } else {
            args.accessHash = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _firstName = reader.tgReadString();
            args.firstName = _firstName;
        } else {
            args.firstName = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _lastName = reader.tgReadString();
            args.lastName = _lastName;
        } else {
            args.lastName = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _username = reader.tgReadString();
            args.username = _username;
        } else {
            args.username = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _phone = reader.tgReadString();
            args.phone = _phone;
        } else {
            args.phone = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _status = reader.tgReadObject();
            args.status = _status;
        } else {
            args.status = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _botInfoVersion = reader.readInt();
            args.botInfoVersion = _botInfoVersion;
        } else {
            args.botInfoVersion = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _restrictionReason = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.restrictionReason = _restrictionReason;
        } else {
            args.restrictionReason = undefined;
        }
        if (args.flags & (1 << 19)) {
            const _botInlinePlaceholder = reader.tgReadString();
            args.botInlinePlaceholder = _botInlinePlaceholder;
        } else {
            args.botInlinePlaceholder = undefined;
        }
        if (args.flags & (1 << 22)) {
            const _langCode = reader.tgReadString();
            args.langCode = _langCode;
        } else {
            args.langCode = undefined;
        }
        if (args.flags & (1 << 30)) {
            const _emojiStatus = reader.tgReadObject();
            args.emojiStatus = _emojiStatus;
        } else {
            args.emojiStatus = undefined;
        }
        if (args.flags2 & (1 << 0)) {
            const _usernames = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.usernames = _usernames;
        } else {
            args.usernames = undefined;
        }
        if (args.flags2 & (1 << 5)) {
            const _storiesMaxId = reader.tgReadObject();
            args.storiesMaxId = _storiesMaxId;
        } else {
            args.storiesMaxId = undefined;
        }
        if (args.flags2 & (1 << 8)) {
            const _color = reader.tgReadObject();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        if (args.flags2 & (1 << 9)) {
            const _profileColor = reader.tgReadObject();
            args.profileColor = _profileColor;
        } else {
            args.profileColor = undefined;
        }
        if (args.flags2 & (1 << 12)) {
            const _botActiveUsers = reader.readInt();
            args.botActiveUsers = _botActiveUsers;
        } else {
            args.botActiveUsers = undefined;
        }
        if (args.flags2 & (1 << 14)) {
            const _botVerificationIcon = reader.readLargeInt(64);
            args.botVerificationIcon = _botVerificationIcon;
        } else {
            args.botVerificationIcon = undefined;
        }
        if (args.flags2 & (1 << 15)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        return new User(args);
    }
}