import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class GroupCall extends TLObject {
    static CONSTRUCTOR_ID = 4021466647;
    static SUBCLASS_OF_ID = 548729632;
    static className = "GroupCall";
    static classType = "constructor";

    flags!: number;
    joinMuted?: boolean;
    canChangeJoinMuted?: boolean;
    joinDateAsc?: boolean;
    scheduleStartSubscribed?: boolean;
    canStartVideo?: boolean;
    recordVideoActive?: boolean;
    rtmpStream?: boolean;
    listenersHidden?: boolean;
    conference?: boolean;
    creator?: boolean;
    messagesEnabled?: boolean;
    canChangeMessagesEnabled?: boolean;
    min?: boolean;
    id!: bigint;
    accessHash!: bigint;
    participantsCount!: number;
    title?: string;
    streamDcId?: number;
    recordStartDate?: number;
    scheduleDate?: number;
    unmutedVideoCount?: number;
    unmutedVideoLimit!: number;
    version!: number;
    inviteLink?: string;
    sendPaidMessagesStars?: bigint;
    defaultSendAs?: TypePeer;

    constructor(args: { flags?: number, joinMuted?: boolean, canChangeJoinMuted?: boolean, joinDateAsc?: boolean, scheduleStartSubscribed?: boolean, canStartVideo?: boolean, recordVideoActive?: boolean, rtmpStream?: boolean, listenersHidden?: boolean, conference?: boolean, creator?: boolean, messagesEnabled?: boolean, canChangeMessagesEnabled?: boolean, min?: boolean, id?: bigint, accessHash?: bigint, participantsCount?: number, title?: string, streamDcId?: number, recordStartDate?: number, scheduleDate?: number, unmutedVideoCount?: number, unmutedVideoLimit?: number, version?: number, inviteLink?: string, sendPaidMessagesStars?: bigint, defaultSendAs?: TypePeer } = {}) {
        super();
        this.flags = args.flags!;
        this.joinMuted = args.joinMuted;
        this.canChangeJoinMuted = args.canChangeJoinMuted;
        this.joinDateAsc = args.joinDateAsc;
        this.scheduleStartSubscribed = args.scheduleStartSubscribed;
        this.canStartVideo = args.canStartVideo;
        this.recordVideoActive = args.recordVideoActive;
        this.rtmpStream = args.rtmpStream;
        this.listenersHidden = args.listenersHidden;
        this.conference = args.conference;
        this.creator = args.creator;
        this.messagesEnabled = args.messagesEnabled;
        this.canChangeMessagesEnabled = args.canChangeMessagesEnabled;
        this.min = args.min;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.participantsCount = args.participantsCount!;
        this.title = args.title;
        this.streamDcId = args.streamDcId;
        this.recordStartDate = args.recordStartDate;
        this.scheduleDate = args.scheduleDate;
        this.unmutedVideoCount = args.unmutedVideoCount;
        this.unmutedVideoLimit = args.unmutedVideoLimit!;
        this.version = args.version!;
        this.inviteLink = args.inviteLink;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
        this.defaultSendAs = args.defaultSendAs;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4021466647, false);
        let flags = 0;
        if (this.joinMuted) { flags |= 1 << 1; }
        if (this.canChangeJoinMuted) { flags |= 1 << 2; }
        if (this.joinDateAsc) { flags |= 1 << 6; }
        if (this.scheduleStartSubscribed) { flags |= 1 << 8; }
        if (this.canStartVideo) { flags |= 1 << 9; }
        if (this.recordVideoActive) { flags |= 1 << 11; }
        if (this.rtmpStream) { flags |= 1 << 12; }
        if (this.listenersHidden) { flags |= 1 << 13; }
        if (this.conference) { flags |= 1 << 14; }
        if (this.creator) { flags |= 1 << 15; }
        if (this.messagesEnabled) { flags |= 1 << 17; }
        if (this.canChangeMessagesEnabled) { flags |= 1 << 18; }
        if (this.min) { flags |= 1 << 19; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 3; }
        if (this.streamDcId !== undefined && this.streamDcId !== null) { flags |= 1 << 4; }
        if (this.recordStartDate !== undefined && this.recordStartDate !== null) { flags |= 1 << 5; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 7; }
        if (this.unmutedVideoCount !== undefined && this.unmutedVideoCount !== null) { flags |= 1 << 10; }
        if (this.inviteLink !== undefined && this.inviteLink !== null) { flags |= 1 << 16; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags |= 1 << 20; }
        if (this.defaultSendAs !== undefined && this.defaultSendAs !== null) { flags |= 1 << 21; }
        writer.writeInt(flags, false);
        if (this.joinMuted !== undefined && this.joinMuted !== null) {
        }
        if (this.canChangeJoinMuted !== undefined && this.canChangeJoinMuted !== null) {
        }
        if (this.joinDateAsc !== undefined && this.joinDateAsc !== null) {
        }
        if (this.scheduleStartSubscribed !== undefined && this.scheduleStartSubscribed !== null) {
        }
        if (this.canStartVideo !== undefined && this.canStartVideo !== null) {
        }
        if (this.recordVideoActive !== undefined && this.recordVideoActive !== null) {
        }
        if (this.rtmpStream !== undefined && this.rtmpStream !== null) {
        }
        if (this.listenersHidden !== undefined && this.listenersHidden !== null) {
        }
        if (this.conference !== undefined && this.conference !== null) {
        }
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.messagesEnabled !== undefined && this.messagesEnabled !== null) {
        }
        if (this.canChangeMessagesEnabled !== undefined && this.canChangeMessagesEnabled !== null) {
        }
        if (this.min !== undefined && this.min !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.participantsCount);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.streamDcId !== undefined && this.streamDcId !== null) {
            writer.writeInt(this.streamDcId);
        }
        if (this.recordStartDate !== undefined && this.recordStartDate !== null) {
            writer.writeInt(this.recordStartDate);
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.unmutedVideoCount !== undefined && this.unmutedVideoCount !== null) {
            writer.writeInt(this.unmutedVideoCount);
        }
        writer.writeInt(this.unmutedVideoLimit);
        writer.writeInt(this.version);
        if (this.inviteLink !== undefined && this.inviteLink !== null) {
            writer.tgWriteString(this.inviteLink);
        }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) {
            writer.writeLargeInt(this.sendPaidMessagesStars, 64);
        }
        if (this.defaultSendAs !== undefined && this.defaultSendAs !== null) {
            writer.write(this.defaultSendAs.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _joinMuted = true;
            args.joinMuted = _joinMuted;
        } else {
            args.joinMuted = false;
        }
        if (args.flags & (1 << 2)) {
            const _canChangeJoinMuted = true;
            args.canChangeJoinMuted = _canChangeJoinMuted;
        } else {
            args.canChangeJoinMuted = false;
        }
        if (args.flags & (1 << 6)) {
            const _joinDateAsc = true;
            args.joinDateAsc = _joinDateAsc;
        } else {
            args.joinDateAsc = false;
        }
        if (args.flags & (1 << 8)) {
            const _scheduleStartSubscribed = true;
            args.scheduleStartSubscribed = _scheduleStartSubscribed;
        } else {
            args.scheduleStartSubscribed = false;
        }
        if (args.flags & (1 << 9)) {
            const _canStartVideo = true;
            args.canStartVideo = _canStartVideo;
        } else {
            args.canStartVideo = false;
        }
        if (args.flags & (1 << 11)) {
            const _recordVideoActive = true;
            args.recordVideoActive = _recordVideoActive;
        } else {
            args.recordVideoActive = false;
        }
        if (args.flags & (1 << 12)) {
            const _rtmpStream = true;
            args.rtmpStream = _rtmpStream;
        } else {
            args.rtmpStream = false;
        }
        if (args.flags & (1 << 13)) {
            const _listenersHidden = true;
            args.listenersHidden = _listenersHidden;
        } else {
            args.listenersHidden = false;
        }
        if (args.flags & (1 << 14)) {
            const _conference = true;
            args.conference = _conference;
        } else {
            args.conference = false;
        }
        if (args.flags & (1 << 15)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 17)) {
            const _messagesEnabled = true;
            args.messagesEnabled = _messagesEnabled;
        } else {
            args.messagesEnabled = false;
        }
        if (args.flags & (1 << 18)) {
            const _canChangeMessagesEnabled = true;
            args.canChangeMessagesEnabled = _canChangeMessagesEnabled;
        } else {
            args.canChangeMessagesEnabled = false;
        }
        if (args.flags & (1 << 19)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _participantsCount = reader.readInt();
        args.participantsCount = _participantsCount;
        if (args.flags & (1 << 3)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _streamDcId = reader.readInt();
            args.streamDcId = _streamDcId;
        } else {
            args.streamDcId = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _recordStartDate = reader.readInt();
            args.recordStartDate = _recordStartDate;
        } else {
            args.recordStartDate = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _unmutedVideoCount = reader.readInt();
            args.unmutedVideoCount = _unmutedVideoCount;
        } else {
            args.unmutedVideoCount = undefined;
        }
        const _unmutedVideoLimit = reader.readInt();
        args.unmutedVideoLimit = _unmutedVideoLimit;
        const _version = reader.readInt();
        args.version = _version;
        if (args.flags & (1 << 16)) {
            const _inviteLink = reader.tgReadString();
            args.inviteLink = _inviteLink;
        } else {
            args.inviteLink = undefined;
        }
        if (args.flags & (1 << 20)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        if (args.flags & (1 << 21)) {
            const _defaultSendAs = reader.tgReadObject();
            args.defaultSendAs = _defaultSendAs;
        } else {
            args.defaultSendAs = undefined;
        }
        return new GroupCall(args);
    }
}