import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatParticipants } from "./TypeChatParticipants";
import { TypePhoto } from "./TypePhoto";
import { TypePeerNotifySettings } from "./TypePeerNotifySettings";
import { TypeExportedChatInvite } from "./TypeExportedChatInvite";
import { TypeBotInfo } from "./TypeBotInfo";
import { TypeInputGroupCall } from "./TypeInputGroupCall";
import { TypePeer } from "./TypePeer";
import { TypeChatReactions } from "./TypeChatReactions";

export class ChatFull extends TLObject {
    static CONSTRUCTOR_ID = 640893467;
    static SUBCLASS_OF_ID = 3566872215;
    static className = "ChatFull";
    static classType = "constructor";

    flags!: number;
    canSetUsername?: boolean;
    hasScheduled?: boolean;
    translationsDisabled?: boolean;
    id!: bigint;
    about!: string;
    participants!: TypeChatParticipants;
    chatPhoto?: TypePhoto;
    notifySettings!: TypePeerNotifySettings;
    exportedInvite?: TypeExportedChatInvite;
    botInfo?: TypeBotInfo[];
    pinnedMsgId?: number;
    folderId?: number;
    call?: TypeInputGroupCall;
    ttlPeriod?: number;
    groupcallDefaultJoinAs?: TypePeer;
    themeEmoticon?: string;
    requestsPending?: number;
    recentRequesters?: bigint[];
    availableReactions?: TypeChatReactions;
    reactionsLimit?: number;

    constructor(args: { flags?: number, canSetUsername?: boolean, hasScheduled?: boolean, translationsDisabled?: boolean, id?: bigint, about?: string, participants?: TypeChatParticipants, chatPhoto?: TypePhoto, notifySettings?: TypePeerNotifySettings, exportedInvite?: TypeExportedChatInvite, botInfo?: TypeBotInfo[], pinnedMsgId?: number, folderId?: number, call?: TypeInputGroupCall, ttlPeriod?: number, groupcallDefaultJoinAs?: TypePeer, themeEmoticon?: string, requestsPending?: number, recentRequesters?: bigint[], availableReactions?: TypeChatReactions, reactionsLimit?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.canSetUsername = args.canSetUsername;
        this.hasScheduled = args.hasScheduled;
        this.translationsDisabled = args.translationsDisabled;
        this.id = args.id!;
        this.about = args.about!;
        this.participants = args.participants!;
        this.chatPhoto = args.chatPhoto;
        this.notifySettings = args.notifySettings!;
        this.exportedInvite = args.exportedInvite;
        this.botInfo = args.botInfo;
        this.pinnedMsgId = args.pinnedMsgId;
        this.folderId = args.folderId;
        this.call = args.call;
        this.ttlPeriod = args.ttlPeriod;
        this.groupcallDefaultJoinAs = args.groupcallDefaultJoinAs;
        this.themeEmoticon = args.themeEmoticon;
        this.requestsPending = args.requestsPending;
        this.recentRequesters = args.recentRequesters;
        this.availableReactions = args.availableReactions;
        this.reactionsLimit = args.reactionsLimit;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(640893467, false);
        let flags = 0;
        if (this.canSetUsername) { flags |= 1 << 7; }
        if (this.hasScheduled) { flags |= 1 << 8; }
        if (this.translationsDisabled) { flags |= 1 << 19; }
        if (this.chatPhoto !== undefined && this.chatPhoto !== null) { flags |= 1 << 2; }
        if (this.exportedInvite !== undefined && this.exportedInvite !== null) { flags |= 1 << 13; }
        if (this.botInfo !== undefined && this.botInfo !== null) { flags |= 1 << 3; }
        if (this.pinnedMsgId !== undefined && this.pinnedMsgId !== null) { flags |= 1 << 6; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 11; }
        if (this.call !== undefined && this.call !== null) { flags |= 1 << 12; }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) { flags |= 1 << 14; }
        if (this.groupcallDefaultJoinAs !== undefined && this.groupcallDefaultJoinAs !== null) { flags |= 1 << 15; }
        if (this.themeEmoticon !== undefined && this.themeEmoticon !== null) { flags |= 1 << 16; }
        if (this.requestsPending !== undefined && this.requestsPending !== null) { flags |= 1 << 17; }
        if (this.recentRequesters !== undefined && this.recentRequesters !== null) { flags |= 1 << 17; }
        if (this.availableReactions !== undefined && this.availableReactions !== null) { flags |= 1 << 18; }
        if (this.reactionsLimit !== undefined && this.reactionsLimit !== null) { flags |= 1 << 20; }
        writer.writeInt(flags, false);
        if (this.canSetUsername !== undefined && this.canSetUsername !== null) {
        }
        if (this.hasScheduled !== undefined && this.hasScheduled !== null) {
        }
        if (this.translationsDisabled !== undefined && this.translationsDisabled !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.about);
        writer.write(this.participants.getBytes());
        if (this.chatPhoto !== undefined && this.chatPhoto !== null) {
            writer.write(this.chatPhoto.getBytes());
        }
        writer.write(this.notifySettings.getBytes());
        if (this.exportedInvite !== undefined && this.exportedInvite !== null) {
            writer.write(this.exportedInvite.getBytes());
        }
        if (this.botInfo !== undefined && this.botInfo !== null) {
            writer.writeVector(this.botInfo, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.pinnedMsgId !== undefined && this.pinnedMsgId !== null) {
            writer.writeInt(this.pinnedMsgId);
        }
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        if (this.call !== undefined && this.call !== null) {
            writer.write(this.call.getBytes());
        }
        if (this.ttlPeriod !== undefined && this.ttlPeriod !== null) {
            writer.writeInt(this.ttlPeriod);
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
        if (this.availableReactions !== undefined && this.availableReactions !== null) {
            writer.write(this.availableReactions.getBytes());
        }
        if (this.reactionsLimit !== undefined && this.reactionsLimit !== null) {
            writer.writeInt(this.reactionsLimit);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatFull {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 7)) {
            const _canSetUsername = true;
            args.canSetUsername = _canSetUsername;
        } else {
            args.canSetUsername = false;
        }
        if (args.flags & (1 << 8)) {
            const _hasScheduled = true;
            args.hasScheduled = _hasScheduled;
        } else {
            args.hasScheduled = false;
        }
        if (args.flags & (1 << 19)) {
            const _translationsDisabled = true;
            args.translationsDisabled = _translationsDisabled;
        } else {
            args.translationsDisabled = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _about = reader.tgReadString();
        args.about = _about;
        const _participants = reader.tgReadObject();
        args.participants = _participants;
        if (args.flags & (1 << 2)) {
            const _chatPhoto = reader.tgReadObject();
            args.chatPhoto = _chatPhoto;
        } else {
            args.chatPhoto = undefined;
        }
        const _notifySettings = reader.tgReadObject();
        args.notifySettings = _notifySettings;
        if (args.flags & (1 << 13)) {
            const _exportedInvite = reader.tgReadObject();
            args.exportedInvite = _exportedInvite;
        } else {
            args.exportedInvite = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _botInfo = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
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
        if (args.flags & (1 << 11)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _call = reader.tgReadObject();
            args.call = _call;
        } else {
            args.call = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _ttlPeriod = reader.readInt();
            args.ttlPeriod = _ttlPeriod;
        } else {
            args.ttlPeriod = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _groupcallDefaultJoinAs = reader.tgReadObject();
            args.groupcallDefaultJoinAs = _groupcallDefaultJoinAs;
        } else {
            args.groupcallDefaultJoinAs = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _themeEmoticon = reader.tgReadString();
            args.themeEmoticon = _themeEmoticon;
        } else {
            args.themeEmoticon = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _requestsPending = reader.readInt();
            args.requestsPending = _requestsPending;
        } else {
            args.requestsPending = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _recentRequesters = reader.readVector((reader) => {
                const item = reader.readLargeInt(64);
                return item;
            });
            args.recentRequesters = _recentRequesters;
        } else {
            args.recentRequesters = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _availableReactions = reader.tgReadObject();
            args.availableReactions = _availableReactions;
        } else {
            args.availableReactions = undefined;
        }
        if (args.flags & (1 << 20)) {
            const _reactionsLimit = reader.readInt();
            args.reactionsLimit = _reactionsLimit;
        } else {
            args.reactionsLimit = undefined;
        }
        return new ChatFull(args);
    }
}