import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerSettings extends TLObject {
    static CONSTRUCTOR_ID = 4101456375;
    static SUBCLASS_OF_ID = 4138180484;
    static className = "PeerSettings";
    static classType = "constructor";

    flags!: number;
    reportSpam?: boolean;
    addContact?: boolean;
    blockContact?: boolean;
    shareContact?: boolean;
    needContactsException?: boolean;
    reportGeo?: boolean;
    autoarchived?: boolean;
    inviteMembers?: boolean;
    requestChatBroadcast?: boolean;
    businessBotPaused?: boolean;
    businessBotCanReply?: boolean;
    geoDistance?: number;
    requestChatTitle?: string;
    requestChatDate?: number;
    businessBotId?: bigint;
    businessBotManageUrl?: string;
    chargePaidMessageStars?: bigint;
    registrationMonth?: string;
    phoneCountry?: string;
    nameChangeDate?: number;
    photoChangeDate?: number;

    constructor(args: { flags?: number, reportSpam?: boolean, addContact?: boolean, blockContact?: boolean, shareContact?: boolean, needContactsException?: boolean, reportGeo?: boolean, autoarchived?: boolean, inviteMembers?: boolean, requestChatBroadcast?: boolean, businessBotPaused?: boolean, businessBotCanReply?: boolean, geoDistance?: number, requestChatTitle?: string, requestChatDate?: number, businessBotId?: bigint, businessBotManageUrl?: string, chargePaidMessageStars?: bigint, registrationMonth?: string, phoneCountry?: string, nameChangeDate?: number, photoChangeDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.reportSpam = args.reportSpam;
        this.addContact = args.addContact;
        this.blockContact = args.blockContact;
        this.shareContact = args.shareContact;
        this.needContactsException = args.needContactsException;
        this.reportGeo = args.reportGeo;
        this.autoarchived = args.autoarchived;
        this.inviteMembers = args.inviteMembers;
        this.requestChatBroadcast = args.requestChatBroadcast;
        this.businessBotPaused = args.businessBotPaused;
        this.businessBotCanReply = args.businessBotCanReply;
        this.geoDistance = args.geoDistance;
        this.requestChatTitle = args.requestChatTitle;
        this.requestChatDate = args.requestChatDate;
        this.businessBotId = args.businessBotId;
        this.businessBotManageUrl = args.businessBotManageUrl;
        this.chargePaidMessageStars = args.chargePaidMessageStars;
        this.registrationMonth = args.registrationMonth;
        this.phoneCountry = args.phoneCountry;
        this.nameChangeDate = args.nameChangeDate;
        this.photoChangeDate = args.photoChangeDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4101456375, false);
        let flags = 0;
        if (this.reportSpam) { flags |= 1 << 0; }
        if (this.addContact) { flags |= 1 << 1; }
        if (this.blockContact) { flags |= 1 << 2; }
        if (this.shareContact) { flags |= 1 << 3; }
        if (this.needContactsException) { flags |= 1 << 4; }
        if (this.reportGeo) { flags |= 1 << 5; }
        if (this.autoarchived) { flags |= 1 << 7; }
        if (this.inviteMembers) { flags |= 1 << 8; }
        if (this.requestChatBroadcast) { flags |= 1 << 10; }
        if (this.businessBotPaused) { flags |= 1 << 11; }
        if (this.businessBotCanReply) { flags |= 1 << 12; }
        if (this.geoDistance !== undefined && this.geoDistance !== null) { flags |= 1 << 6; }
        if (this.requestChatTitle !== undefined && this.requestChatTitle !== null) { flags |= 1 << 9; }
        if (this.requestChatDate !== undefined && this.requestChatDate !== null) { flags |= 1 << 9; }
        if (this.businessBotId !== undefined && this.businessBotId !== null) { flags |= 1 << 13; }
        if (this.businessBotManageUrl !== undefined && this.businessBotManageUrl !== null) { flags |= 1 << 13; }
        if (this.chargePaidMessageStars !== undefined && this.chargePaidMessageStars !== null) { flags |= 1 << 14; }
        if (this.registrationMonth !== undefined && this.registrationMonth !== null) { flags |= 1 << 15; }
        if (this.phoneCountry !== undefined && this.phoneCountry !== null) { flags |= 1 << 16; }
        if (this.nameChangeDate !== undefined && this.nameChangeDate !== null) { flags |= 1 << 17; }
        if (this.photoChangeDate !== undefined && this.photoChangeDate !== null) { flags |= 1 << 18; }
        writer.writeInt(flags, false);
        if (this.reportSpam !== undefined && this.reportSpam !== null) {
        }
        if (this.addContact !== undefined && this.addContact !== null) {
        }
        if (this.blockContact !== undefined && this.blockContact !== null) {
        }
        if (this.shareContact !== undefined && this.shareContact !== null) {
        }
        if (this.needContactsException !== undefined && this.needContactsException !== null) {
        }
        if (this.reportGeo !== undefined && this.reportGeo !== null) {
        }
        if (this.autoarchived !== undefined && this.autoarchived !== null) {
        }
        if (this.inviteMembers !== undefined && this.inviteMembers !== null) {
        }
        if (this.requestChatBroadcast !== undefined && this.requestChatBroadcast !== null) {
        }
        if (this.businessBotPaused !== undefined && this.businessBotPaused !== null) {
        }
        if (this.businessBotCanReply !== undefined && this.businessBotCanReply !== null) {
        }
        if (this.geoDistance !== undefined && this.geoDistance !== null) {
            writer.writeInt(this.geoDistance);
        }
        if (this.requestChatTitle !== undefined && this.requestChatTitle !== null) {
            writer.tgWriteString(this.requestChatTitle);
        }
        if (this.requestChatDate !== undefined && this.requestChatDate !== null) {
            writer.writeInt(this.requestChatDate);
        }
        if (this.businessBotId !== undefined && this.businessBotId !== null) {
            writer.writeLargeInt(this.businessBotId, 64);
        }
        if (this.businessBotManageUrl !== undefined && this.businessBotManageUrl !== null) {
            writer.tgWriteString(this.businessBotManageUrl);
        }
        if (this.chargePaidMessageStars !== undefined && this.chargePaidMessageStars !== null) {
            writer.writeLargeInt(this.chargePaidMessageStars, 64);
        }
        if (this.registrationMonth !== undefined && this.registrationMonth !== null) {
            writer.tgWriteString(this.registrationMonth);
        }
        if (this.phoneCountry !== undefined && this.phoneCountry !== null) {
            writer.tgWriteString(this.phoneCountry);
        }
        if (this.nameChangeDate !== undefined && this.nameChangeDate !== null) {
            writer.writeInt(this.nameChangeDate);
        }
        if (this.photoChangeDate !== undefined && this.photoChangeDate !== null) {
            writer.writeInt(this.photoChangeDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _reportSpam = true;
            args.reportSpam = _reportSpam;
        } else {
            args.reportSpam = false;
        }
        if (args.flags & (1 << 1)) {
            const _addContact = true;
            args.addContact = _addContact;
        } else {
            args.addContact = false;
        }
        if (args.flags & (1 << 2)) {
            const _blockContact = true;
            args.blockContact = _blockContact;
        } else {
            args.blockContact = false;
        }
        if (args.flags & (1 << 3)) {
            const _shareContact = true;
            args.shareContact = _shareContact;
        } else {
            args.shareContact = false;
        }
        if (args.flags & (1 << 4)) {
            const _needContactsException = true;
            args.needContactsException = _needContactsException;
        } else {
            args.needContactsException = false;
        }
        if (args.flags & (1 << 5)) {
            const _reportGeo = true;
            args.reportGeo = _reportGeo;
        } else {
            args.reportGeo = false;
        }
        if (args.flags & (1 << 7)) {
            const _autoarchived = true;
            args.autoarchived = _autoarchived;
        } else {
            args.autoarchived = false;
        }
        if (args.flags & (1 << 8)) {
            const _inviteMembers = true;
            args.inviteMembers = _inviteMembers;
        } else {
            args.inviteMembers = false;
        }
        if (args.flags & (1 << 10)) {
            const _requestChatBroadcast = true;
            args.requestChatBroadcast = _requestChatBroadcast;
        } else {
            args.requestChatBroadcast = false;
        }
        if (args.flags & (1 << 11)) {
            const _businessBotPaused = true;
            args.businessBotPaused = _businessBotPaused;
        } else {
            args.businessBotPaused = false;
        }
        if (args.flags & (1 << 12)) {
            const _businessBotCanReply = true;
            args.businessBotCanReply = _businessBotCanReply;
        } else {
            args.businessBotCanReply = false;
        }
        if (args.flags & (1 << 6)) {
            const _geoDistance = reader.readInt();
            args.geoDistance = _geoDistance;
        } else {
            args.geoDistance = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _requestChatTitle = reader.tgReadString();
            args.requestChatTitle = _requestChatTitle;
        } else {
            args.requestChatTitle = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _requestChatDate = reader.readInt();
            args.requestChatDate = _requestChatDate;
        } else {
            args.requestChatDate = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _businessBotId = reader.readLargeInt(64);
            args.businessBotId = _businessBotId;
        } else {
            args.businessBotId = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _businessBotManageUrl = reader.tgReadString();
            args.businessBotManageUrl = _businessBotManageUrl;
        } else {
            args.businessBotManageUrl = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _chargePaidMessageStars = reader.readLargeInt(64);
            args.chargePaidMessageStars = _chargePaidMessageStars;
        } else {
            args.chargePaidMessageStars = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _registrationMonth = reader.tgReadString();
            args.registrationMonth = _registrationMonth;
        } else {
            args.registrationMonth = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _phoneCountry = reader.tgReadString();
            args.phoneCountry = _phoneCountry;
        } else {
            args.phoneCountry = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _nameChangeDate = reader.readInt();
            args.nameChangeDate = _nameChangeDate;
        } else {
            args.nameChangeDate = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _photoChangeDate = reader.readInt();
            args.photoChangeDate = _photoChangeDate;
        } else {
            args.photoChangeDate = undefined;
        }
        return new PeerSettings(args);
    }
}