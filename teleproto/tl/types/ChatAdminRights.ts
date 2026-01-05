import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatAdminRights extends TLObject {
    static CONSTRUCTOR_ID = 1605510357;
    static SUBCLASS_OF_ID = 2252195780;
    static className = "ChatAdminRights";
    static classType = "constructor";

    flags!: number;
    changeInfo?: boolean;
    postMessages?: boolean;
    editMessages?: boolean;
    deleteMessages?: boolean;
    banUsers?: boolean;
    inviteUsers?: boolean;
    pinMessages?: boolean;
    addAdmins?: boolean;
    anonymous?: boolean;
    manageCall?: boolean;
    other?: boolean;
    manageTopics?: boolean;
    postStories?: boolean;
    editStories?: boolean;
    deleteStories?: boolean;
    manageDirectMessages?: boolean;

    constructor(args: { flags?: number, changeInfo?: boolean, postMessages?: boolean, editMessages?: boolean, deleteMessages?: boolean, banUsers?: boolean, inviteUsers?: boolean, pinMessages?: boolean, addAdmins?: boolean, anonymous?: boolean, manageCall?: boolean, other?: boolean, manageTopics?: boolean, postStories?: boolean, editStories?: boolean, deleteStories?: boolean, manageDirectMessages?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.changeInfo = args.changeInfo;
        this.postMessages = args.postMessages;
        this.editMessages = args.editMessages;
        this.deleteMessages = args.deleteMessages;
        this.banUsers = args.banUsers;
        this.inviteUsers = args.inviteUsers;
        this.pinMessages = args.pinMessages;
        this.addAdmins = args.addAdmins;
        this.anonymous = args.anonymous;
        this.manageCall = args.manageCall;
        this.other = args.other;
        this.manageTopics = args.manageTopics;
        this.postStories = args.postStories;
        this.editStories = args.editStories;
        this.deleteStories = args.deleteStories;
        this.manageDirectMessages = args.manageDirectMessages;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1605510357, false);
        let flags = 0;
        if (this.changeInfo) { flags |= 1 << 0; }
        if (this.postMessages) { flags |= 1 << 1; }
        if (this.editMessages) { flags |= 1 << 2; }
        if (this.deleteMessages) { flags |= 1 << 3; }
        if (this.banUsers) { flags |= 1 << 4; }
        if (this.inviteUsers) { flags |= 1 << 5; }
        if (this.pinMessages) { flags |= 1 << 7; }
        if (this.addAdmins) { flags |= 1 << 9; }
        if (this.anonymous) { flags |= 1 << 10; }
        if (this.manageCall) { flags |= 1 << 11; }
        if (this.other) { flags |= 1 << 12; }
        if (this.manageTopics) { flags |= 1 << 13; }
        if (this.postStories) { flags |= 1 << 14; }
        if (this.editStories) { flags |= 1 << 15; }
        if (this.deleteStories) { flags |= 1 << 16; }
        if (this.manageDirectMessages) { flags |= 1 << 17; }
        writer.writeInt(flags, false);
        if (this.changeInfo !== undefined && this.changeInfo !== null) {
        }
        if (this.postMessages !== undefined && this.postMessages !== null) {
        }
        if (this.editMessages !== undefined && this.editMessages !== null) {
        }
        if (this.deleteMessages !== undefined && this.deleteMessages !== null) {
        }
        if (this.banUsers !== undefined && this.banUsers !== null) {
        }
        if (this.inviteUsers !== undefined && this.inviteUsers !== null) {
        }
        if (this.pinMessages !== undefined && this.pinMessages !== null) {
        }
        if (this.addAdmins !== undefined && this.addAdmins !== null) {
        }
        if (this.anonymous !== undefined && this.anonymous !== null) {
        }
        if (this.manageCall !== undefined && this.manageCall !== null) {
        }
        if (this.other !== undefined && this.other !== null) {
        }
        if (this.manageTopics !== undefined && this.manageTopics !== null) {
        }
        if (this.postStories !== undefined && this.postStories !== null) {
        }
        if (this.editStories !== undefined && this.editStories !== null) {
        }
        if (this.deleteStories !== undefined && this.deleteStories !== null) {
        }
        if (this.manageDirectMessages !== undefined && this.manageDirectMessages !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatAdminRights {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _changeInfo = true;
            args.changeInfo = _changeInfo;
        } else {
            args.changeInfo = false;
        }
        if (args.flags & (1 << 1)) {
            const _postMessages = true;
            args.postMessages = _postMessages;
        } else {
            args.postMessages = false;
        }
        if (args.flags & (1 << 2)) {
            const _editMessages = true;
            args.editMessages = _editMessages;
        } else {
            args.editMessages = false;
        }
        if (args.flags & (1 << 3)) {
            const _deleteMessages = true;
            args.deleteMessages = _deleteMessages;
        } else {
            args.deleteMessages = false;
        }
        if (args.flags & (1 << 4)) {
            const _banUsers = true;
            args.banUsers = _banUsers;
        } else {
            args.banUsers = false;
        }
        if (args.flags & (1 << 5)) {
            const _inviteUsers = true;
            args.inviteUsers = _inviteUsers;
        } else {
            args.inviteUsers = false;
        }
        if (args.flags & (1 << 7)) {
            const _pinMessages = true;
            args.pinMessages = _pinMessages;
        } else {
            args.pinMessages = false;
        }
        if (args.flags & (1 << 9)) {
            const _addAdmins = true;
            args.addAdmins = _addAdmins;
        } else {
            args.addAdmins = false;
        }
        if (args.flags & (1 << 10)) {
            const _anonymous = true;
            args.anonymous = _anonymous;
        } else {
            args.anonymous = false;
        }
        if (args.flags & (1 << 11)) {
            const _manageCall = true;
            args.manageCall = _manageCall;
        } else {
            args.manageCall = false;
        }
        if (args.flags & (1 << 12)) {
            const _other = true;
            args.other = _other;
        } else {
            args.other = false;
        }
        if (args.flags & (1 << 13)) {
            const _manageTopics = true;
            args.manageTopics = _manageTopics;
        } else {
            args.manageTopics = false;
        }
        if (args.flags & (1 << 14)) {
            const _postStories = true;
            args.postStories = _postStories;
        } else {
            args.postStories = false;
        }
        if (args.flags & (1 << 15)) {
            const _editStories = true;
            args.editStories = _editStories;
        } else {
            args.editStories = false;
        }
        if (args.flags & (1 << 16)) {
            const _deleteStories = true;
            args.deleteStories = _deleteStories;
        } else {
            args.deleteStories = false;
        }
        if (args.flags & (1 << 17)) {
            const _manageDirectMessages = true;
            args.manageDirectMessages = _manageDirectMessages;
        } else {
            args.manageDirectMessages = false;
        }
        return new ChatAdminRights(args);
    }
}