import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDcOption } from "./TypeDcOption";
import { TypeReaction } from "./TypeReaction";

export class Config extends TLObject {
    static CONSTRUCTOR_ID = 3424265246;
    static SUBCLASS_OF_ID = 3542493770;
    static className = "Config";
    static classType = "constructor";

    flags!: number;
    defaultP2pContacts?: boolean;
    preloadFeaturedStickers?: boolean;
    revokePmInbox?: boolean;
    blockedMode?: boolean;
    forceTryIpv6?: boolean;
    date!: number;
    expires!: number;
    testMode!: boolean;
    thisDc!: number;
    dcOptions!: TypeDcOption[];
    dcTxtDomainName!: string;
    chatSizeMax!: number;
    megagroupSizeMax!: number;
    forwardedCountMax!: number;
    onlineUpdatePeriodMs!: number;
    offlineBlurTimeoutMs!: number;
    offlineIdleTimeoutMs!: number;
    onlineCloudTimeoutMs!: number;
    notifyCloudDelayMs!: number;
    notifyDefaultDelayMs!: number;
    pushChatPeriodMs!: number;
    pushChatLimit!: number;
    editTimeLimit!: number;
    revokeTimeLimit!: number;
    revokePmTimeLimit!: number;
    ratingEDecay!: number;
    stickersRecentLimit!: number;
    channelsReadMediaPeriod!: number;
    tmpSessions?: number;
    callReceiveTimeoutMs!: number;
    callRingTimeoutMs!: number;
    callConnectTimeoutMs!: number;
    callPacketTimeoutMs!: number;
    meUrlPrefix!: string;
    autoupdateUrlPrefix?: string;
    gifSearchUsername?: string;
    venueSearchUsername?: string;
    imgSearchUsername?: string;
    staticMapsProvider?: string;
    captionLengthMax!: number;
    messageLengthMax!: number;
    webfileDcId!: number;
    suggestedLangCode?: string;
    langPackVersion?: number;
    baseLangPackVersion?: number;
    reactionsDefault?: TypeReaction;
    autologinToken?: string;

    constructor(args: { flags?: number, defaultP2pContacts?: boolean, preloadFeaturedStickers?: boolean, revokePmInbox?: boolean, blockedMode?: boolean, forceTryIpv6?: boolean, date?: number, expires?: number, testMode?: boolean, thisDc?: number, dcOptions?: TypeDcOption[], dcTxtDomainName?: string, chatSizeMax?: number, megagroupSizeMax?: number, forwardedCountMax?: number, onlineUpdatePeriodMs?: number, offlineBlurTimeoutMs?: number, offlineIdleTimeoutMs?: number, onlineCloudTimeoutMs?: number, notifyCloudDelayMs?: number, notifyDefaultDelayMs?: number, pushChatPeriodMs?: number, pushChatLimit?: number, editTimeLimit?: number, revokeTimeLimit?: number, revokePmTimeLimit?: number, ratingEDecay?: number, stickersRecentLimit?: number, channelsReadMediaPeriod?: number, tmpSessions?: number, callReceiveTimeoutMs?: number, callRingTimeoutMs?: number, callConnectTimeoutMs?: number, callPacketTimeoutMs?: number, meUrlPrefix?: string, autoupdateUrlPrefix?: string, gifSearchUsername?: string, venueSearchUsername?: string, imgSearchUsername?: string, staticMapsProvider?: string, captionLengthMax?: number, messageLengthMax?: number, webfileDcId?: number, suggestedLangCode?: string, langPackVersion?: number, baseLangPackVersion?: number, reactionsDefault?: TypeReaction, autologinToken?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.defaultP2pContacts = args.defaultP2pContacts;
        this.preloadFeaturedStickers = args.preloadFeaturedStickers;
        this.revokePmInbox = args.revokePmInbox;
        this.blockedMode = args.blockedMode;
        this.forceTryIpv6 = args.forceTryIpv6;
        this.date = args.date!;
        this.expires = args.expires!;
        this.testMode = args.testMode!;
        this.thisDc = args.thisDc!;
        this.dcOptions = args.dcOptions!;
        this.dcTxtDomainName = args.dcTxtDomainName!;
        this.chatSizeMax = args.chatSizeMax!;
        this.megagroupSizeMax = args.megagroupSizeMax!;
        this.forwardedCountMax = args.forwardedCountMax!;
        this.onlineUpdatePeriodMs = args.onlineUpdatePeriodMs!;
        this.offlineBlurTimeoutMs = args.offlineBlurTimeoutMs!;
        this.offlineIdleTimeoutMs = args.offlineIdleTimeoutMs!;
        this.onlineCloudTimeoutMs = args.onlineCloudTimeoutMs!;
        this.notifyCloudDelayMs = args.notifyCloudDelayMs!;
        this.notifyDefaultDelayMs = args.notifyDefaultDelayMs!;
        this.pushChatPeriodMs = args.pushChatPeriodMs!;
        this.pushChatLimit = args.pushChatLimit!;
        this.editTimeLimit = args.editTimeLimit!;
        this.revokeTimeLimit = args.revokeTimeLimit!;
        this.revokePmTimeLimit = args.revokePmTimeLimit!;
        this.ratingEDecay = args.ratingEDecay!;
        this.stickersRecentLimit = args.stickersRecentLimit!;
        this.channelsReadMediaPeriod = args.channelsReadMediaPeriod!;
        this.tmpSessions = args.tmpSessions;
        this.callReceiveTimeoutMs = args.callReceiveTimeoutMs!;
        this.callRingTimeoutMs = args.callRingTimeoutMs!;
        this.callConnectTimeoutMs = args.callConnectTimeoutMs!;
        this.callPacketTimeoutMs = args.callPacketTimeoutMs!;
        this.meUrlPrefix = args.meUrlPrefix!;
        this.autoupdateUrlPrefix = args.autoupdateUrlPrefix;
        this.gifSearchUsername = args.gifSearchUsername;
        this.venueSearchUsername = args.venueSearchUsername;
        this.imgSearchUsername = args.imgSearchUsername;
        this.staticMapsProvider = args.staticMapsProvider;
        this.captionLengthMax = args.captionLengthMax!;
        this.messageLengthMax = args.messageLengthMax!;
        this.webfileDcId = args.webfileDcId!;
        this.suggestedLangCode = args.suggestedLangCode;
        this.langPackVersion = args.langPackVersion;
        this.baseLangPackVersion = args.baseLangPackVersion;
        this.reactionsDefault = args.reactionsDefault;
        this.autologinToken = args.autologinToken;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3424265246, false);
        let flags = 0;
        if (this.defaultP2pContacts) { flags |= 1 << 3; }
        if (this.preloadFeaturedStickers) { flags |= 1 << 4; }
        if (this.revokePmInbox) { flags |= 1 << 6; }
        if (this.blockedMode) { flags |= 1 << 8; }
        if (this.forceTryIpv6) { flags |= 1 << 14; }
        if (this.tmpSessions !== undefined && this.tmpSessions !== null) { flags |= 1 << 0; }
        if (this.autoupdateUrlPrefix !== undefined && this.autoupdateUrlPrefix !== null) { flags |= 1 << 7; }
        if (this.gifSearchUsername !== undefined && this.gifSearchUsername !== null) { flags |= 1 << 9; }
        if (this.venueSearchUsername !== undefined && this.venueSearchUsername !== null) { flags |= 1 << 10; }
        if (this.imgSearchUsername !== undefined && this.imgSearchUsername !== null) { flags |= 1 << 11; }
        if (this.staticMapsProvider !== undefined && this.staticMapsProvider !== null) { flags |= 1 << 12; }
        if (this.suggestedLangCode !== undefined && this.suggestedLangCode !== null) { flags |= 1 << 2; }
        if (this.langPackVersion !== undefined && this.langPackVersion !== null) { flags |= 1 << 2; }
        if (this.baseLangPackVersion !== undefined && this.baseLangPackVersion !== null) { flags |= 1 << 2; }
        if (this.reactionsDefault !== undefined && this.reactionsDefault !== null) { flags |= 1 << 15; }
        if (this.autologinToken !== undefined && this.autologinToken !== null) { flags |= 1 << 16; }
        writer.writeInt(flags, false);
        if (this.defaultP2pContacts !== undefined && this.defaultP2pContacts !== null) {
        }
        if (this.preloadFeaturedStickers !== undefined && this.preloadFeaturedStickers !== null) {
        }
        if (this.revokePmInbox !== undefined && this.revokePmInbox !== null) {
        }
        if (this.blockedMode !== undefined && this.blockedMode !== null) {
        }
        if (this.forceTryIpv6 !== undefined && this.forceTryIpv6 !== null) {
        }
        writer.writeInt(this.date);
        writer.writeInt(this.expires);
        writer.tgWriteBool(this.testMode);
        writer.writeInt(this.thisDc);
        writer.writeVector(this.dcOptions, (item) => {
            writer.write(item.getBytes());
        });
        writer.tgWriteString(this.dcTxtDomainName);
        writer.writeInt(this.chatSizeMax);
        writer.writeInt(this.megagroupSizeMax);
        writer.writeInt(this.forwardedCountMax);
        writer.writeInt(this.onlineUpdatePeriodMs);
        writer.writeInt(this.offlineBlurTimeoutMs);
        writer.writeInt(this.offlineIdleTimeoutMs);
        writer.writeInt(this.onlineCloudTimeoutMs);
        writer.writeInt(this.notifyCloudDelayMs);
        writer.writeInt(this.notifyDefaultDelayMs);
        writer.writeInt(this.pushChatPeriodMs);
        writer.writeInt(this.pushChatLimit);
        writer.writeInt(this.editTimeLimit);
        writer.writeInt(this.revokeTimeLimit);
        writer.writeInt(this.revokePmTimeLimit);
        writer.writeInt(this.ratingEDecay);
        writer.writeInt(this.stickersRecentLimit);
        writer.writeInt(this.channelsReadMediaPeriod);
        if (this.tmpSessions !== undefined && this.tmpSessions !== null) {
            writer.writeInt(this.tmpSessions);
        }
        writer.writeInt(this.callReceiveTimeoutMs);
        writer.writeInt(this.callRingTimeoutMs);
        writer.writeInt(this.callConnectTimeoutMs);
        writer.writeInt(this.callPacketTimeoutMs);
        writer.tgWriteString(this.meUrlPrefix);
        if (this.autoupdateUrlPrefix !== undefined && this.autoupdateUrlPrefix !== null) {
            writer.tgWriteString(this.autoupdateUrlPrefix);
        }
        if (this.gifSearchUsername !== undefined && this.gifSearchUsername !== null) {
            writer.tgWriteString(this.gifSearchUsername);
        }
        if (this.venueSearchUsername !== undefined && this.venueSearchUsername !== null) {
            writer.tgWriteString(this.venueSearchUsername);
        }
        if (this.imgSearchUsername !== undefined && this.imgSearchUsername !== null) {
            writer.tgWriteString(this.imgSearchUsername);
        }
        if (this.staticMapsProvider !== undefined && this.staticMapsProvider !== null) {
            writer.tgWriteString(this.staticMapsProvider);
        }
        writer.writeInt(this.captionLengthMax);
        writer.writeInt(this.messageLengthMax);
        writer.writeInt(this.webfileDcId);
        if (this.suggestedLangCode !== undefined && this.suggestedLangCode !== null) {
            writer.tgWriteString(this.suggestedLangCode);
        }
        if (this.langPackVersion !== undefined && this.langPackVersion !== null) {
            writer.writeInt(this.langPackVersion);
        }
        if (this.baseLangPackVersion !== undefined && this.baseLangPackVersion !== null) {
            writer.writeInt(this.baseLangPackVersion);
        }
        if (this.reactionsDefault !== undefined && this.reactionsDefault !== null) {
            writer.write(this.reactionsDefault.getBytes());
        }
        if (this.autologinToken !== undefined && this.autologinToken !== null) {
            writer.tgWriteString(this.autologinToken);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Config {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _defaultP2pContacts = true;
            args.defaultP2pContacts = _defaultP2pContacts;
        } else {
            args.defaultP2pContacts = false;
        }
        if (args.flags & (1 << 4)) {
            const _preloadFeaturedStickers = true;
            args.preloadFeaturedStickers = _preloadFeaturedStickers;
        } else {
            args.preloadFeaturedStickers = false;
        }
        if (args.flags & (1 << 6)) {
            const _revokePmInbox = true;
            args.revokePmInbox = _revokePmInbox;
        } else {
            args.revokePmInbox = false;
        }
        if (args.flags & (1 << 8)) {
            const _blockedMode = true;
            args.blockedMode = _blockedMode;
        } else {
            args.blockedMode = false;
        }
        if (args.flags & (1 << 14)) {
            const _forceTryIpv6 = true;
            args.forceTryIpv6 = _forceTryIpv6;
        } else {
            args.forceTryIpv6 = false;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _expires = reader.readInt();
        args.expires = _expires;
        const _testMode = reader.tgReadBool();
        args.testMode = _testMode;
        const _thisDc = reader.readInt();
        args.thisDc = _thisDc;
        const _dcOptions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.dcOptions = _dcOptions;
        const _dcTxtDomainName = reader.tgReadString();
        args.dcTxtDomainName = _dcTxtDomainName;
        const _chatSizeMax = reader.readInt();
        args.chatSizeMax = _chatSizeMax;
        const _megagroupSizeMax = reader.readInt();
        args.megagroupSizeMax = _megagroupSizeMax;
        const _forwardedCountMax = reader.readInt();
        args.forwardedCountMax = _forwardedCountMax;
        const _onlineUpdatePeriodMs = reader.readInt();
        args.onlineUpdatePeriodMs = _onlineUpdatePeriodMs;
        const _offlineBlurTimeoutMs = reader.readInt();
        args.offlineBlurTimeoutMs = _offlineBlurTimeoutMs;
        const _offlineIdleTimeoutMs = reader.readInt();
        args.offlineIdleTimeoutMs = _offlineIdleTimeoutMs;
        const _onlineCloudTimeoutMs = reader.readInt();
        args.onlineCloudTimeoutMs = _onlineCloudTimeoutMs;
        const _notifyCloudDelayMs = reader.readInt();
        args.notifyCloudDelayMs = _notifyCloudDelayMs;
        const _notifyDefaultDelayMs = reader.readInt();
        args.notifyDefaultDelayMs = _notifyDefaultDelayMs;
        const _pushChatPeriodMs = reader.readInt();
        args.pushChatPeriodMs = _pushChatPeriodMs;
        const _pushChatLimit = reader.readInt();
        args.pushChatLimit = _pushChatLimit;
        const _editTimeLimit = reader.readInt();
        args.editTimeLimit = _editTimeLimit;
        const _revokeTimeLimit = reader.readInt();
        args.revokeTimeLimit = _revokeTimeLimit;
        const _revokePmTimeLimit = reader.readInt();
        args.revokePmTimeLimit = _revokePmTimeLimit;
        const _ratingEDecay = reader.readInt();
        args.ratingEDecay = _ratingEDecay;
        const _stickersRecentLimit = reader.readInt();
        args.stickersRecentLimit = _stickersRecentLimit;
        const _channelsReadMediaPeriod = reader.readInt();
        args.channelsReadMediaPeriod = _channelsReadMediaPeriod;
        if (args.flags & (1 << 0)) {
            const _tmpSessions = reader.readInt();
            args.tmpSessions = _tmpSessions;
        } else {
            args.tmpSessions = undefined;
        }
        const _callReceiveTimeoutMs = reader.readInt();
        args.callReceiveTimeoutMs = _callReceiveTimeoutMs;
        const _callRingTimeoutMs = reader.readInt();
        args.callRingTimeoutMs = _callRingTimeoutMs;
        const _callConnectTimeoutMs = reader.readInt();
        args.callConnectTimeoutMs = _callConnectTimeoutMs;
        const _callPacketTimeoutMs = reader.readInt();
        args.callPacketTimeoutMs = _callPacketTimeoutMs;
        const _meUrlPrefix = reader.tgReadString();
        args.meUrlPrefix = _meUrlPrefix;
        if (args.flags & (1 << 7)) {
            const _autoupdateUrlPrefix = reader.tgReadString();
            args.autoupdateUrlPrefix = _autoupdateUrlPrefix;
        } else {
            args.autoupdateUrlPrefix = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _gifSearchUsername = reader.tgReadString();
            args.gifSearchUsername = _gifSearchUsername;
        } else {
            args.gifSearchUsername = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _venueSearchUsername = reader.tgReadString();
            args.venueSearchUsername = _venueSearchUsername;
        } else {
            args.venueSearchUsername = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _imgSearchUsername = reader.tgReadString();
            args.imgSearchUsername = _imgSearchUsername;
        } else {
            args.imgSearchUsername = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _staticMapsProvider = reader.tgReadString();
            args.staticMapsProvider = _staticMapsProvider;
        } else {
            args.staticMapsProvider = undefined;
        }
        const _captionLengthMax = reader.readInt();
        args.captionLengthMax = _captionLengthMax;
        const _messageLengthMax = reader.readInt();
        args.messageLengthMax = _messageLengthMax;
        const _webfileDcId = reader.readInt();
        args.webfileDcId = _webfileDcId;
        if (args.flags & (1 << 2)) {
            const _suggestedLangCode = reader.tgReadString();
            args.suggestedLangCode = _suggestedLangCode;
        } else {
            args.suggestedLangCode = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _langPackVersion = reader.readInt();
            args.langPackVersion = _langPackVersion;
        } else {
            args.langPackVersion = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _baseLangPackVersion = reader.readInt();
            args.baseLangPackVersion = _baseLangPackVersion;
        } else {
            args.baseLangPackVersion = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _reactionsDefault = reader.tgReadObject();
            args.reactionsDefault = _reactionsDefault;
        } else {
            args.reactionsDefault = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _autologinToken = reader.tgReadString();
            args.autologinToken = _autologinToken;
        } else {
            args.autologinToken = undefined;
        }
        return new Config(args);
    }
}