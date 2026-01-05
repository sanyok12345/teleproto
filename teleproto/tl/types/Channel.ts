import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatPhoto } from "./TypeChatPhoto";
import { TypeRestrictionReason } from "./TypeRestrictionReason";
import { TypeChatAdminRights } from "./TypeChatAdminRights";
import { TypeChatBannedRights } from "./TypeChatBannedRights";
import { TypeUsername } from "./TypeUsername";
import { TypeRecentStory } from "./TypeRecentStory";
import { TypePeerColor } from "./TypePeerColor";
import { TypeEmojiStatus } from "./TypeEmojiStatus";

export class Channel extends TLObject {
    static CONSTRUCTOR_ID = 473084188;
    static SUBCLASS_OF_ID = 3316604308;
    static className = "Channel";
    static classType = "constructor";

    flags!: number;
    creator?: boolean;
    left?: boolean;
    broadcast?: boolean;
    verified?: boolean;
    megagroup?: boolean;
    restricted?: boolean;
    signatures?: boolean;
    min?: boolean;
    scam?: boolean;
    hasLink?: boolean;
    hasGeo?: boolean;
    slowmodeEnabled?: boolean;
    callActive?: boolean;
    callNotEmpty?: boolean;
    fake?: boolean;
    gigagroup?: boolean;
    noforwards?: boolean;
    joinToSend?: boolean;
    joinRequest?: boolean;
    forum?: boolean;
    flags2!: number;
    storiesHidden?: boolean;
    storiesHiddenMin?: boolean;
    storiesUnavailable?: boolean;
    signatureProfiles?: boolean;
    autotranslation?: boolean;
    broadcastMessagesAllowed?: boolean;
    monoforum?: boolean;
    forumTabs?: boolean;
    id!: bigint;
    accessHash?: bigint;
    title!: string;
    username?: string;
    photo!: TypeChatPhoto;
    date!: number;
    restrictionReason?: TypeRestrictionReason[];
    adminRights?: TypeChatAdminRights;
    bannedRights?: TypeChatBannedRights;
    defaultBannedRights?: TypeChatBannedRights;
    participantsCount?: number;
    usernames?: TypeUsername[];
    storiesMaxId?: TypeRecentStory;
    color?: TypePeerColor;
    profileColor?: TypePeerColor;
    emojiStatus?: TypeEmojiStatus;
    level?: number;
    subscriptionUntilDate?: number;
    botVerificationIcon?: bigint;
    sendPaidMessagesStars?: bigint;
    linkedMonoforumId?: bigint;

    constructor(args: { flags?: number, creator?: boolean, left?: boolean, broadcast?: boolean, verified?: boolean, megagroup?: boolean, restricted?: boolean, signatures?: boolean, min?: boolean, scam?: boolean, hasLink?: boolean, hasGeo?: boolean, slowmodeEnabled?: boolean, callActive?: boolean, callNotEmpty?: boolean, fake?: boolean, gigagroup?: boolean, noforwards?: boolean, joinToSend?: boolean, joinRequest?: boolean, forum?: boolean, flags2?: number, storiesHidden?: boolean, storiesHiddenMin?: boolean, storiesUnavailable?: boolean, signatureProfiles?: boolean, autotranslation?: boolean, broadcastMessagesAllowed?: boolean, monoforum?: boolean, forumTabs?: boolean, id?: bigint, accessHash?: bigint, title?: string, username?: string, photo?: TypeChatPhoto, date?: number, restrictionReason?: TypeRestrictionReason[], adminRights?: TypeChatAdminRights, bannedRights?: TypeChatBannedRights, defaultBannedRights?: TypeChatBannedRights, participantsCount?: number, usernames?: TypeUsername[], storiesMaxId?: TypeRecentStory, color?: TypePeerColor, profileColor?: TypePeerColor, emojiStatus?: TypeEmojiStatus, level?: number, subscriptionUntilDate?: number, botVerificationIcon?: bigint, sendPaidMessagesStars?: bigint, linkedMonoforumId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.creator = args.creator;
        this.left = args.left;
        this.broadcast = args.broadcast;
        this.verified = args.verified;
        this.megagroup = args.megagroup;
        this.restricted = args.restricted;
        this.signatures = args.signatures;
        this.min = args.min;
        this.scam = args.scam;
        this.hasLink = args.hasLink;
        this.hasGeo = args.hasGeo;
        this.slowmodeEnabled = args.slowmodeEnabled;
        this.callActive = args.callActive;
        this.callNotEmpty = args.callNotEmpty;
        this.fake = args.fake;
        this.gigagroup = args.gigagroup;
        this.noforwards = args.noforwards;
        this.joinToSend = args.joinToSend;
        this.joinRequest = args.joinRequest;
        this.forum = args.forum;
        this.flags2 = args.flags2!;
        this.storiesHidden = args.storiesHidden;
        this.storiesHiddenMin = args.storiesHiddenMin;
        this.storiesUnavailable = args.storiesUnavailable;
        this.signatureProfiles = args.signatureProfiles;
        this.autotranslation = args.autotranslation;
        this.broadcastMessagesAllowed = args.broadcastMessagesAllowed;
        this.monoforum = args.monoforum;
        this.forumTabs = args.forumTabs;
        this.id = args.id!;
        this.accessHash = args.accessHash;
        this.title = args.title!;
        this.username = args.username;
        this.photo = args.photo!;
        this.date = args.date!;
        this.restrictionReason = args.restrictionReason;
        this.adminRights = args.adminRights;
        this.bannedRights = args.bannedRights;
        this.defaultBannedRights = args.defaultBannedRights;
        this.participantsCount = args.participantsCount;
        this.usernames = args.usernames;
        this.storiesMaxId = args.storiesMaxId;
        this.color = args.color;
        this.profileColor = args.profileColor;
        this.emojiStatus = args.emojiStatus;
        this.level = args.level;
        this.subscriptionUntilDate = args.subscriptionUntilDate;
        this.botVerificationIcon = args.botVerificationIcon;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
        this.linkedMonoforumId = args.linkedMonoforumId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(473084188, false);
        let flags = 0;
        if (this.creator) { flags |= 1 << 0; }
        if (this.left) { flags |= 1 << 2; }
        if (this.broadcast) { flags |= 1 << 5; }
        if (this.verified) { flags |= 1 << 7; }
        if (this.megagroup) { flags |= 1 << 8; }
        if (this.restricted) { flags |= 1 << 9; }
        if (this.signatures) { flags |= 1 << 11; }
        if (this.min) { flags |= 1 << 12; }
        if (this.scam) { flags |= 1 << 19; }
        if (this.hasLink) { flags |= 1 << 20; }
        if (this.hasGeo) { flags |= 1 << 21; }
        if (this.slowmodeEnabled) { flags |= 1 << 22; }
        if (this.callActive) { flags |= 1 << 23; }
        if (this.callNotEmpty) { flags |= 1 << 24; }
        if (this.fake) { flags |= 1 << 25; }
        if (this.gigagroup) { flags |= 1 << 26; }
        if (this.noforwards) { flags |= 1 << 27; }
        if (this.joinToSend) { flags |= 1 << 28; }
        if (this.joinRequest) { flags |= 1 << 29; }
        if (this.forum) { flags |= 1 << 30; }
        if (this.accessHash !== undefined && this.accessHash !== null) { flags |= 1 << 13; }
        if (this.username !== undefined && this.username !== null) { flags |= 1 << 6; }
        if (this.restrictionReason !== undefined && this.restrictionReason !== null) { flags |= 1 << 9; }
        if (this.adminRights !== undefined && this.adminRights !== null) { flags |= 1 << 14; }
        if (this.bannedRights !== undefined && this.bannedRights !== null) { flags |= 1 << 15; }
        if (this.defaultBannedRights !== undefined && this.defaultBannedRights !== null) { flags |= 1 << 18; }
        if (this.participantsCount !== undefined && this.participantsCount !== null) { flags |= 1 << 17; }
        writer.writeInt(flags, false);
        let flags2 = 0;
        if (this.storiesHidden) { flags2 |= 1 << 1; }
        if (this.storiesHiddenMin) { flags2 |= 1 << 2; }
        if (this.storiesUnavailable) { flags2 |= 1 << 3; }
        if (this.signatureProfiles) { flags2 |= 1 << 12; }
        if (this.autotranslation) { flags2 |= 1 << 15; }
        if (this.broadcastMessagesAllowed) { flags2 |= 1 << 16; }
        if (this.monoforum) { flags2 |= 1 << 17; }
        if (this.forumTabs) { flags2 |= 1 << 19; }
        if (this.usernames !== undefined && this.usernames !== null) { flags2 |= 1 << 0; }
        if (this.storiesMaxId !== undefined && this.storiesMaxId !== null) { flags2 |= 1 << 4; }
        if (this.color !== undefined && this.color !== null) { flags2 |= 1 << 7; }
        if (this.profileColor !== undefined && this.profileColor !== null) { flags2 |= 1 << 8; }
        if (this.emojiStatus !== undefined && this.emojiStatus !== null) { flags2 |= 1 << 9; }
        if (this.level !== undefined && this.level !== null) { flags2 |= 1 << 10; }
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) { flags2 |= 1 << 11; }
        if (this.botVerificationIcon !== undefined && this.botVerificationIcon !== null) { flags2 |= 1 << 13; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags2 |= 1 << 14; }
        if (this.linkedMonoforumId !== undefined && this.linkedMonoforumId !== null) { flags2 |= 1 << 18; }
        writer.writeInt(flags2, false);
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.left !== undefined && this.left !== null) {
        }
        if (this.broadcast !== undefined && this.broadcast !== null) {
        }
        if (this.verified !== undefined && this.verified !== null) {
        }
        if (this.megagroup !== undefined && this.megagroup !== null) {
        }
        if (this.restricted !== undefined && this.restricted !== null) {
        }
        if (this.signatures !== undefined && this.signatures !== null) {
        }
        if (this.min !== undefined && this.min !== null) {
        }
        if (this.scam !== undefined && this.scam !== null) {
        }
        if (this.hasLink !== undefined && this.hasLink !== null) {
        }
        if (this.hasGeo !== undefined && this.hasGeo !== null) {
        }
        if (this.slowmodeEnabled !== undefined && this.slowmodeEnabled !== null) {
        }
        if (this.callActive !== undefined && this.callActive !== null) {
        }
        if (this.callNotEmpty !== undefined && this.callNotEmpty !== null) {
        }
        if (this.fake !== undefined && this.fake !== null) {
        }
        if (this.gigagroup !== undefined && this.gigagroup !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.joinToSend !== undefined && this.joinToSend !== null) {
        }
        if (this.joinRequest !== undefined && this.joinRequest !== null) {
        }
        if (this.forum !== undefined && this.forum !== null) {
        }
        if (this.storiesHidden !== undefined && this.storiesHidden !== null) {
        }
        if (this.storiesHiddenMin !== undefined && this.storiesHiddenMin !== null) {
        }
        if (this.storiesUnavailable !== undefined && this.storiesUnavailable !== null) {
        }
        if (this.signatureProfiles !== undefined && this.signatureProfiles !== null) {
        }
        if (this.autotranslation !== undefined && this.autotranslation !== null) {
        }
        if (this.broadcastMessagesAllowed !== undefined && this.broadcastMessagesAllowed !== null) {
        }
        if (this.monoforum !== undefined && this.monoforum !== null) {
        }
        if (this.forumTabs !== undefined && this.forumTabs !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        if (this.accessHash !== undefined && this.accessHash !== null) {
            writer.writeLargeInt(this.accessHash, 64);
        }
        writer.tgWriteString(this.title);
        if (this.username !== undefined && this.username !== null) {
            writer.tgWriteString(this.username);
        }
        writer.write(this.photo.getBytes());
        writer.writeInt(this.date);
        if (this.restrictionReason !== undefined && this.restrictionReason !== null) {
            writer.writeVector(this.restrictionReason, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.adminRights !== undefined && this.adminRights !== null) {
            writer.write(this.adminRights.getBytes());
        }
        if (this.bannedRights !== undefined && this.bannedRights !== null) {
            writer.write(this.bannedRights.getBytes());
        }
        if (this.defaultBannedRights !== undefined && this.defaultBannedRights !== null) {
            writer.write(this.defaultBannedRights.getBytes());
        }
        if (this.participantsCount !== undefined && this.participantsCount !== null) {
            writer.writeInt(this.participantsCount);
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
        if (this.emojiStatus !== undefined && this.emojiStatus !== null) {
            writer.write(this.emojiStatus.getBytes());
        }
        if (this.level !== undefined && this.level !== null) {
            writer.writeInt(this.level);
        }
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) {
            writer.writeInt(this.subscriptionUntilDate);
        }
        if (this.botVerificationIcon !== undefined && this.botVerificationIcon !== null) {
            writer.writeLargeInt(this.botVerificationIcon, 64);
        }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) {
            writer.writeLargeInt(this.sendPaidMessagesStars, 64);
        }
        if (this.linkedMonoforumId !== undefined && this.linkedMonoforumId !== null) {
            writer.writeLargeInt(this.linkedMonoforumId, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Channel {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 2)) {
            const _left = true;
            args.left = _left;
        } else {
            args.left = false;
        }
        if (args.flags & (1 << 5)) {
            const _broadcast = true;
            args.broadcast = _broadcast;
        } else {
            args.broadcast = false;
        }
        if (args.flags & (1 << 7)) {
            const _verified = true;
            args.verified = _verified;
        } else {
            args.verified = false;
        }
        if (args.flags & (1 << 8)) {
            const _megagroup = true;
            args.megagroup = _megagroup;
        } else {
            args.megagroup = false;
        }
        if (args.flags & (1 << 9)) {
            const _restricted = true;
            args.restricted = _restricted;
        } else {
            args.restricted = false;
        }
        if (args.flags & (1 << 11)) {
            const _signatures = true;
            args.signatures = _signatures;
        } else {
            args.signatures = false;
        }
        if (args.flags & (1 << 12)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        if (args.flags & (1 << 19)) {
            const _scam = true;
            args.scam = _scam;
        } else {
            args.scam = false;
        }
        if (args.flags & (1 << 20)) {
            const _hasLink = true;
            args.hasLink = _hasLink;
        } else {
            args.hasLink = false;
        }
        if (args.flags & (1 << 21)) {
            const _hasGeo = true;
            args.hasGeo = _hasGeo;
        } else {
            args.hasGeo = false;
        }
        if (args.flags & (1 << 22)) {
            const _slowmodeEnabled = true;
            args.slowmodeEnabled = _slowmodeEnabled;
        } else {
            args.slowmodeEnabled = false;
        }
        if (args.flags & (1 << 23)) {
            const _callActive = true;
            args.callActive = _callActive;
        } else {
            args.callActive = false;
        }
        if (args.flags & (1 << 24)) {
            const _callNotEmpty = true;
            args.callNotEmpty = _callNotEmpty;
        } else {
            args.callNotEmpty = false;
        }
        if (args.flags & (1 << 25)) {
            const _fake = true;
            args.fake = _fake;
        } else {
            args.fake = false;
        }
        if (args.flags & (1 << 26)) {
            const _gigagroup = true;
            args.gigagroup = _gigagroup;
        } else {
            args.gigagroup = false;
        }
        if (args.flags & (1 << 27)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 28)) {
            const _joinToSend = true;
            args.joinToSend = _joinToSend;
        } else {
            args.joinToSend = false;
        }
        if (args.flags & (1 << 29)) {
            const _joinRequest = true;
            args.joinRequest = _joinRequest;
        } else {
            args.joinRequest = false;
        }
        if (args.flags & (1 << 30)) {
            const _forum = true;
            args.forum = _forum;
        } else {
            args.forum = false;
        }
        const _flags2 = reader.readInt();
        args.flags2 = _flags2;
        if (args.flags2 & (1 << 1)) {
            const _storiesHidden = true;
            args.storiesHidden = _storiesHidden;
        } else {
            args.storiesHidden = false;
        }
        if (args.flags2 & (1 << 2)) {
            const _storiesHiddenMin = true;
            args.storiesHiddenMin = _storiesHiddenMin;
        } else {
            args.storiesHiddenMin = false;
        }
        if (args.flags2 & (1 << 3)) {
            const _storiesUnavailable = true;
            args.storiesUnavailable = _storiesUnavailable;
        } else {
            args.storiesUnavailable = false;
        }
        if (args.flags2 & (1 << 12)) {
            const _signatureProfiles = true;
            args.signatureProfiles = _signatureProfiles;
        } else {
            args.signatureProfiles = false;
        }
        if (args.flags2 & (1 << 15)) {
            const _autotranslation = true;
            args.autotranslation = _autotranslation;
        } else {
            args.autotranslation = false;
        }
        if (args.flags2 & (1 << 16)) {
            const _broadcastMessagesAllowed = true;
            args.broadcastMessagesAllowed = _broadcastMessagesAllowed;
        } else {
            args.broadcastMessagesAllowed = false;
        }
        if (args.flags2 & (1 << 17)) {
            const _monoforum = true;
            args.monoforum = _monoforum;
        } else {
            args.monoforum = false;
        }
        if (args.flags2 & (1 << 19)) {
            const _forumTabs = true;
            args.forumTabs = _forumTabs;
        } else {
            args.forumTabs = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        if (args.flags & (1 << 13)) {
            const _accessHash = reader.readLargeInt(64);
            args.accessHash = _accessHash;
        } else {
            args.accessHash = undefined;
        }
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 6)) {
            const _username = reader.tgReadString();
            args.username = _username;
        } else {
            args.username = undefined;
        }
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 9)) {
            const _restrictionReason = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.restrictionReason = _restrictionReason;
        } else {
            args.restrictionReason = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _adminRights = reader.tgReadObject();
            args.adminRights = _adminRights;
        } else {
            args.adminRights = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _bannedRights = reader.tgReadObject();
            args.bannedRights = _bannedRights;
        } else {
            args.bannedRights = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _defaultBannedRights = reader.tgReadObject();
            args.defaultBannedRights = _defaultBannedRights;
        } else {
            args.defaultBannedRights = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _participantsCount = reader.readInt();
            args.participantsCount = _participantsCount;
        } else {
            args.participantsCount = undefined;
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
        if (args.flags2 & (1 << 4)) {
            const _storiesMaxId = reader.tgReadObject();
            args.storiesMaxId = _storiesMaxId;
        } else {
            args.storiesMaxId = undefined;
        }
        if (args.flags2 & (1 << 7)) {
            const _color = reader.tgReadObject();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        if (args.flags2 & (1 << 8)) {
            const _profileColor = reader.tgReadObject();
            args.profileColor = _profileColor;
        } else {
            args.profileColor = undefined;
        }
        if (args.flags2 & (1 << 9)) {
            const _emojiStatus = reader.tgReadObject();
            args.emojiStatus = _emojiStatus;
        } else {
            args.emojiStatus = undefined;
        }
        if (args.flags2 & (1 << 10)) {
            const _level = reader.readInt();
            args.level = _level;
        } else {
            args.level = undefined;
        }
        if (args.flags2 & (1 << 11)) {
            const _subscriptionUntilDate = reader.readInt();
            args.subscriptionUntilDate = _subscriptionUntilDate;
        } else {
            args.subscriptionUntilDate = undefined;
        }
        if (args.flags2 & (1 << 13)) {
            const _botVerificationIcon = reader.readLargeInt(64);
            args.botVerificationIcon = _botVerificationIcon;
        } else {
            args.botVerificationIcon = undefined;
        }
        if (args.flags2 & (1 << 14)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        if (args.flags2 & (1 << 18)) {
            const _linkedMonoforumId = reader.readLargeInt(64);
            args.linkedMonoforumId = _linkedMonoforumId;
        } else {
            args.linkedMonoforumId = undefined;
        }
        return new Channel(args);
    }
}