import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BusinessBotRights extends TLObject {
    static CONSTRUCTOR_ID = 2690796791;
    static SUBCLASS_OF_ID = 3101455770;
    static className = "BusinessBotRights";
    static classType = "constructor";

    flags!: number;
    reply?: boolean;
    readMessages?: boolean;
    deleteSentMessages?: boolean;
    deleteReceivedMessages?: boolean;
    editName?: boolean;
    editBio?: boolean;
    editProfilePhoto?: boolean;
    editUsername?: boolean;
    viewGifts?: boolean;
    sellGifts?: boolean;
    changeGiftSettings?: boolean;
    transferAndUpgradeGifts?: boolean;
    transferStars?: boolean;
    manageStories?: boolean;

    constructor(args: { flags?: number, reply?: boolean, readMessages?: boolean, deleteSentMessages?: boolean, deleteReceivedMessages?: boolean, editName?: boolean, editBio?: boolean, editProfilePhoto?: boolean, editUsername?: boolean, viewGifts?: boolean, sellGifts?: boolean, changeGiftSettings?: boolean, transferAndUpgradeGifts?: boolean, transferStars?: boolean, manageStories?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.reply = args.reply;
        this.readMessages = args.readMessages;
        this.deleteSentMessages = args.deleteSentMessages;
        this.deleteReceivedMessages = args.deleteReceivedMessages;
        this.editName = args.editName;
        this.editBio = args.editBio;
        this.editProfilePhoto = args.editProfilePhoto;
        this.editUsername = args.editUsername;
        this.viewGifts = args.viewGifts;
        this.sellGifts = args.sellGifts;
        this.changeGiftSettings = args.changeGiftSettings;
        this.transferAndUpgradeGifts = args.transferAndUpgradeGifts;
        this.transferStars = args.transferStars;
        this.manageStories = args.manageStories;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2690796791, false);
        let flags = 0;
        if (this.reply) { flags |= 1 << 0; }
        if (this.readMessages) { flags |= 1 << 1; }
        if (this.deleteSentMessages) { flags |= 1 << 2; }
        if (this.deleteReceivedMessages) { flags |= 1 << 3; }
        if (this.editName) { flags |= 1 << 4; }
        if (this.editBio) { flags |= 1 << 5; }
        if (this.editProfilePhoto) { flags |= 1 << 6; }
        if (this.editUsername) { flags |= 1 << 7; }
        if (this.viewGifts) { flags |= 1 << 8; }
        if (this.sellGifts) { flags |= 1 << 9; }
        if (this.changeGiftSettings) { flags |= 1 << 10; }
        if (this.transferAndUpgradeGifts) { flags |= 1 << 11; }
        if (this.transferStars) { flags |= 1 << 12; }
        if (this.manageStories) { flags |= 1 << 13; }
        writer.writeInt(flags, false);
        if (this.reply !== undefined && this.reply !== null) {
        }
        if (this.readMessages !== undefined && this.readMessages !== null) {
        }
        if (this.deleteSentMessages !== undefined && this.deleteSentMessages !== null) {
        }
        if (this.deleteReceivedMessages !== undefined && this.deleteReceivedMessages !== null) {
        }
        if (this.editName !== undefined && this.editName !== null) {
        }
        if (this.editBio !== undefined && this.editBio !== null) {
        }
        if (this.editProfilePhoto !== undefined && this.editProfilePhoto !== null) {
        }
        if (this.editUsername !== undefined && this.editUsername !== null) {
        }
        if (this.viewGifts !== undefined && this.viewGifts !== null) {
        }
        if (this.sellGifts !== undefined && this.sellGifts !== null) {
        }
        if (this.changeGiftSettings !== undefined && this.changeGiftSettings !== null) {
        }
        if (this.transferAndUpgradeGifts !== undefined && this.transferAndUpgradeGifts !== null) {
        }
        if (this.transferStars !== undefined && this.transferStars !== null) {
        }
        if (this.manageStories !== undefined && this.manageStories !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessBotRights {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _reply = true;
            args.reply = _reply;
        } else {
            args.reply = false;
        }
        if (args.flags & (1 << 1)) {
            const _readMessages = true;
            args.readMessages = _readMessages;
        } else {
            args.readMessages = false;
        }
        if (args.flags & (1 << 2)) {
            const _deleteSentMessages = true;
            args.deleteSentMessages = _deleteSentMessages;
        } else {
            args.deleteSentMessages = false;
        }
        if (args.flags & (1 << 3)) {
            const _deleteReceivedMessages = true;
            args.deleteReceivedMessages = _deleteReceivedMessages;
        } else {
            args.deleteReceivedMessages = false;
        }
        if (args.flags & (1 << 4)) {
            const _editName = true;
            args.editName = _editName;
        } else {
            args.editName = false;
        }
        if (args.flags & (1 << 5)) {
            const _editBio = true;
            args.editBio = _editBio;
        } else {
            args.editBio = false;
        }
        if (args.flags & (1 << 6)) {
            const _editProfilePhoto = true;
            args.editProfilePhoto = _editProfilePhoto;
        } else {
            args.editProfilePhoto = false;
        }
        if (args.flags & (1 << 7)) {
            const _editUsername = true;
            args.editUsername = _editUsername;
        } else {
            args.editUsername = false;
        }
        if (args.flags & (1 << 8)) {
            const _viewGifts = true;
            args.viewGifts = _viewGifts;
        } else {
            args.viewGifts = false;
        }
        if (args.flags & (1 << 9)) {
            const _sellGifts = true;
            args.sellGifts = _sellGifts;
        } else {
            args.sellGifts = false;
        }
        if (args.flags & (1 << 10)) {
            const _changeGiftSettings = true;
            args.changeGiftSettings = _changeGiftSettings;
        } else {
            args.changeGiftSettings = false;
        }
        if (args.flags & (1 << 11)) {
            const _transferAndUpgradeGifts = true;
            args.transferAndUpgradeGifts = _transferAndUpgradeGifts;
        } else {
            args.transferAndUpgradeGifts = false;
        }
        if (args.flags & (1 << 12)) {
            const _transferStars = true;
            args.transferStars = _transferStars;
        } else {
            args.transferStars = false;
        }
        if (args.flags & (1 << 13)) {
            const _manageStories = true;
            args.manageStories = _manageStories;
        } else {
            args.manageStories = false;
        }
        return new BusinessBotRights(args);
    }
}