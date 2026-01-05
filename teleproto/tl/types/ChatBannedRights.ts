import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatBannedRights extends TLObject {
    static CONSTRUCTOR_ID = 2668758040;
    static SUBCLASS_OF_ID = 1263814057;
    static className = "ChatBannedRights";
    static classType = "constructor";

    flags!: number;
    viewMessages?: boolean;
    sendMessages?: boolean;
    sendMedia?: boolean;
    sendStickers?: boolean;
    sendGifs?: boolean;
    sendGames?: boolean;
    sendInline?: boolean;
    embedLinks?: boolean;
    sendPolls?: boolean;
    changeInfo?: boolean;
    inviteUsers?: boolean;
    pinMessages?: boolean;
    manageTopics?: boolean;
    sendPhotos?: boolean;
    sendVideos?: boolean;
    sendRoundvideos?: boolean;
    sendAudios?: boolean;
    sendVoices?: boolean;
    sendDocs?: boolean;
    sendPlain?: boolean;
    untilDate!: number;

    constructor(args: { flags?: number, viewMessages?: boolean, sendMessages?: boolean, sendMedia?: boolean, sendStickers?: boolean, sendGifs?: boolean, sendGames?: boolean, sendInline?: boolean, embedLinks?: boolean, sendPolls?: boolean, changeInfo?: boolean, inviteUsers?: boolean, pinMessages?: boolean, manageTopics?: boolean, sendPhotos?: boolean, sendVideos?: boolean, sendRoundvideos?: boolean, sendAudios?: boolean, sendVoices?: boolean, sendDocs?: boolean, sendPlain?: boolean, untilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.viewMessages = args.viewMessages;
        this.sendMessages = args.sendMessages;
        this.sendMedia = args.sendMedia;
        this.sendStickers = args.sendStickers;
        this.sendGifs = args.sendGifs;
        this.sendGames = args.sendGames;
        this.sendInline = args.sendInline;
        this.embedLinks = args.embedLinks;
        this.sendPolls = args.sendPolls;
        this.changeInfo = args.changeInfo;
        this.inviteUsers = args.inviteUsers;
        this.pinMessages = args.pinMessages;
        this.manageTopics = args.manageTopics;
        this.sendPhotos = args.sendPhotos;
        this.sendVideos = args.sendVideos;
        this.sendRoundvideos = args.sendRoundvideos;
        this.sendAudios = args.sendAudios;
        this.sendVoices = args.sendVoices;
        this.sendDocs = args.sendDocs;
        this.sendPlain = args.sendPlain;
        this.untilDate = args.untilDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2668758040, false);
        let flags = 0;
        if (this.viewMessages) { flags |= 1 << 0; }
        if (this.sendMessages) { flags |= 1 << 1; }
        if (this.sendMedia) { flags |= 1 << 2; }
        if (this.sendStickers) { flags |= 1 << 3; }
        if (this.sendGifs) { flags |= 1 << 4; }
        if (this.sendGames) { flags |= 1 << 5; }
        if (this.sendInline) { flags |= 1 << 6; }
        if (this.embedLinks) { flags |= 1 << 7; }
        if (this.sendPolls) { flags |= 1 << 8; }
        if (this.changeInfo) { flags |= 1 << 10; }
        if (this.inviteUsers) { flags |= 1 << 15; }
        if (this.pinMessages) { flags |= 1 << 17; }
        if (this.manageTopics) { flags |= 1 << 18; }
        if (this.sendPhotos) { flags |= 1 << 19; }
        if (this.sendVideos) { flags |= 1 << 20; }
        if (this.sendRoundvideos) { flags |= 1 << 21; }
        if (this.sendAudios) { flags |= 1 << 22; }
        if (this.sendVoices) { flags |= 1 << 23; }
        if (this.sendDocs) { flags |= 1 << 24; }
        if (this.sendPlain) { flags |= 1 << 25; }
        writer.writeInt(flags, false);
        if (this.viewMessages !== undefined && this.viewMessages !== null) {
        }
        if (this.sendMessages !== undefined && this.sendMessages !== null) {
        }
        if (this.sendMedia !== undefined && this.sendMedia !== null) {
        }
        if (this.sendStickers !== undefined && this.sendStickers !== null) {
        }
        if (this.sendGifs !== undefined && this.sendGifs !== null) {
        }
        if (this.sendGames !== undefined && this.sendGames !== null) {
        }
        if (this.sendInline !== undefined && this.sendInline !== null) {
        }
        if (this.embedLinks !== undefined && this.embedLinks !== null) {
        }
        if (this.sendPolls !== undefined && this.sendPolls !== null) {
        }
        if (this.changeInfo !== undefined && this.changeInfo !== null) {
        }
        if (this.inviteUsers !== undefined && this.inviteUsers !== null) {
        }
        if (this.pinMessages !== undefined && this.pinMessages !== null) {
        }
        if (this.manageTopics !== undefined && this.manageTopics !== null) {
        }
        if (this.sendPhotos !== undefined && this.sendPhotos !== null) {
        }
        if (this.sendVideos !== undefined && this.sendVideos !== null) {
        }
        if (this.sendRoundvideos !== undefined && this.sendRoundvideos !== null) {
        }
        if (this.sendAudios !== undefined && this.sendAudios !== null) {
        }
        if (this.sendVoices !== undefined && this.sendVoices !== null) {
        }
        if (this.sendDocs !== undefined && this.sendDocs !== null) {
        }
        if (this.sendPlain !== undefined && this.sendPlain !== null) {
        }
        writer.writeInt(this.untilDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatBannedRights {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _viewMessages = true;
            args.viewMessages = _viewMessages;
        } else {
            args.viewMessages = false;
        }
        if (args.flags & (1 << 1)) {
            const _sendMessages = true;
            args.sendMessages = _sendMessages;
        } else {
            args.sendMessages = false;
        }
        if (args.flags & (1 << 2)) {
            const _sendMedia = true;
            args.sendMedia = _sendMedia;
        } else {
            args.sendMedia = false;
        }
        if (args.flags & (1 << 3)) {
            const _sendStickers = true;
            args.sendStickers = _sendStickers;
        } else {
            args.sendStickers = false;
        }
        if (args.flags & (1 << 4)) {
            const _sendGifs = true;
            args.sendGifs = _sendGifs;
        } else {
            args.sendGifs = false;
        }
        if (args.flags & (1 << 5)) {
            const _sendGames = true;
            args.sendGames = _sendGames;
        } else {
            args.sendGames = false;
        }
        if (args.flags & (1 << 6)) {
            const _sendInline = true;
            args.sendInline = _sendInline;
        } else {
            args.sendInline = false;
        }
        if (args.flags & (1 << 7)) {
            const _embedLinks = true;
            args.embedLinks = _embedLinks;
        } else {
            args.embedLinks = false;
        }
        if (args.flags & (1 << 8)) {
            const _sendPolls = true;
            args.sendPolls = _sendPolls;
        } else {
            args.sendPolls = false;
        }
        if (args.flags & (1 << 10)) {
            const _changeInfo = true;
            args.changeInfo = _changeInfo;
        } else {
            args.changeInfo = false;
        }
        if (args.flags & (1 << 15)) {
            const _inviteUsers = true;
            args.inviteUsers = _inviteUsers;
        } else {
            args.inviteUsers = false;
        }
        if (args.flags & (1 << 17)) {
            const _pinMessages = true;
            args.pinMessages = _pinMessages;
        } else {
            args.pinMessages = false;
        }
        if (args.flags & (1 << 18)) {
            const _manageTopics = true;
            args.manageTopics = _manageTopics;
        } else {
            args.manageTopics = false;
        }
        if (args.flags & (1 << 19)) {
            const _sendPhotos = true;
            args.sendPhotos = _sendPhotos;
        } else {
            args.sendPhotos = false;
        }
        if (args.flags & (1 << 20)) {
            const _sendVideos = true;
            args.sendVideos = _sendVideos;
        } else {
            args.sendVideos = false;
        }
        if (args.flags & (1 << 21)) {
            const _sendRoundvideos = true;
            args.sendRoundvideos = _sendRoundvideos;
        } else {
            args.sendRoundvideos = false;
        }
        if (args.flags & (1 << 22)) {
            const _sendAudios = true;
            args.sendAudios = _sendAudios;
        } else {
            args.sendAudios = false;
        }
        if (args.flags & (1 << 23)) {
            const _sendVoices = true;
            args.sendVoices = _sendVoices;
        } else {
            args.sendVoices = false;
        }
        if (args.flags & (1 << 24)) {
            const _sendDocs = true;
            args.sendDocs = _sendDocs;
        } else {
            args.sendDocs = false;
        }
        if (args.flags & (1 << 25)) {
            const _sendPlain = true;
            args.sendPlain = _sendPlain;
        } else {
            args.sendPlain = false;
        }
        const _untilDate = reader.readInt();
        args.untilDate = _untilDate;
        return new ChatBannedRights(args);
    }
}