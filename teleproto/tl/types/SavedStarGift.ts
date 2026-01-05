import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStarGift } from "./TypeStarGift";
import { TypeTextWithEntities } from "./TypeTextWithEntities";
import { MessageIDLike } from "./../../define";

export class SavedStarGift extends TLObject {
    static CONSTRUCTOR_ID = 3939926110;
    static SUBCLASS_OF_ID = 2385198100;
    static className = "SavedStarGift";
    static classType = "constructor";

    flags!: number;
    nameHidden?: boolean;
    unsaved?: boolean;
    refunded?: boolean;
    canUpgrade?: boolean;
    pinnedToTop?: boolean;
    upgradeSeparate?: boolean;
    fromId?: TypePeer;
    date!: number;
    gift!: TypeStarGift;
    message?: TypeTextWithEntities;
    msgId?: MessageIDLike;
    savedId?: bigint;
    convertStars?: bigint;
    upgradeStars?: bigint;
    canExportAt?: number;
    transferStars?: bigint;
    canTransferAt?: number;
    canResellAt?: number;
    collectionId?: number[];
    prepaidUpgradeHash?: string;
    dropOriginalDetailsStars?: bigint;
    giftNum?: number;

    constructor(args: { flags?: number, nameHidden?: boolean, unsaved?: boolean, refunded?: boolean, canUpgrade?: boolean, pinnedToTop?: boolean, upgradeSeparate?: boolean, fromId?: TypePeer, date?: number, gift?: TypeStarGift, message?: TypeTextWithEntities, msgId?: MessageIDLike, savedId?: bigint, convertStars?: bigint, upgradeStars?: bigint, canExportAt?: number, transferStars?: bigint, canTransferAt?: number, canResellAt?: number, collectionId?: number[], prepaidUpgradeHash?: string, dropOriginalDetailsStars?: bigint, giftNum?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nameHidden = args.nameHidden;
        this.unsaved = args.unsaved;
        this.refunded = args.refunded;
        this.canUpgrade = args.canUpgrade;
        this.pinnedToTop = args.pinnedToTop;
        this.upgradeSeparate = args.upgradeSeparate;
        this.fromId = args.fromId;
        this.date = args.date!;
        this.gift = args.gift!;
        this.message = args.message;
        this.msgId = args.msgId;
        this.savedId = args.savedId;
        this.convertStars = args.convertStars;
        this.upgradeStars = args.upgradeStars;
        this.canExportAt = args.canExportAt;
        this.transferStars = args.transferStars;
        this.canTransferAt = args.canTransferAt;
        this.canResellAt = args.canResellAt;
        this.collectionId = args.collectionId;
        this.prepaidUpgradeHash = args.prepaidUpgradeHash;
        this.dropOriginalDetailsStars = args.dropOriginalDetailsStars;
        this.giftNum = args.giftNum;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3939926110, false);
        let flags = 0;
        if (this.nameHidden) { flags |= 1 << 0; }
        if (this.unsaved) { flags |= 1 << 5; }
        if (this.refunded) { flags |= 1 << 9; }
        if (this.canUpgrade) { flags |= 1 << 10; }
        if (this.pinnedToTop) { flags |= 1 << 12; }
        if (this.upgradeSeparate) { flags |= 1 << 17; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 1; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 2; }
        if (this.msgId !== undefined && this.msgId !== null) { flags |= 1 << 3; }
        if (this.savedId !== undefined && this.savedId !== null) { flags |= 1 << 11; }
        if (this.convertStars !== undefined && this.convertStars !== null) { flags |= 1 << 4; }
        if (this.upgradeStars !== undefined && this.upgradeStars !== null) { flags |= 1 << 6; }
        if (this.canExportAt !== undefined && this.canExportAt !== null) { flags |= 1 << 7; }
        if (this.transferStars !== undefined && this.transferStars !== null) { flags |= 1 << 8; }
        if (this.canTransferAt !== undefined && this.canTransferAt !== null) { flags |= 1 << 13; }
        if (this.canResellAt !== undefined && this.canResellAt !== null) { flags |= 1 << 14; }
        if (this.collectionId !== undefined && this.collectionId !== null) { flags |= 1 << 15; }
        if (this.prepaidUpgradeHash !== undefined && this.prepaidUpgradeHash !== null) { flags |= 1 << 16; }
        if (this.dropOriginalDetailsStars !== undefined && this.dropOriginalDetailsStars !== null) { flags |= 1 << 18; }
        if (this.giftNum !== undefined && this.giftNum !== null) { flags |= 1 << 19; }
        writer.writeInt(flags, false);
        if (this.nameHidden !== undefined && this.nameHidden !== null) {
        }
        if (this.unsaved !== undefined && this.unsaved !== null) {
        }
        if (this.refunded !== undefined && this.refunded !== null) {
        }
        if (this.canUpgrade !== undefined && this.canUpgrade !== null) {
        }
        if (this.pinnedToTop !== undefined && this.pinnedToTop !== null) {
        }
        if (this.upgradeSeparate !== undefined && this.upgradeSeparate !== null) {
        }
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        writer.writeInt(this.date);
        writer.write(this.gift.getBytes());
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        if (this.msgId !== undefined && this.msgId !== null) {
            if (typeof this.msgId === 'number') {
                writer.writeInt(this.msgId);
            } else {
                writer.writeInt((this.msgId as any).id);
            }
        }
        if (this.savedId !== undefined && this.savedId !== null) {
            writer.writeLargeInt(this.savedId, 64);
        }
        if (this.convertStars !== undefined && this.convertStars !== null) {
            writer.writeLargeInt(this.convertStars, 64);
        }
        if (this.upgradeStars !== undefined && this.upgradeStars !== null) {
            writer.writeLargeInt(this.upgradeStars, 64);
        }
        if (this.canExportAt !== undefined && this.canExportAt !== null) {
            writer.writeInt(this.canExportAt);
        }
        if (this.transferStars !== undefined && this.transferStars !== null) {
            writer.writeLargeInt(this.transferStars, 64);
        }
        if (this.canTransferAt !== undefined && this.canTransferAt !== null) {
            writer.writeInt(this.canTransferAt);
        }
        if (this.canResellAt !== undefined && this.canResellAt !== null) {
            writer.writeInt(this.canResellAt);
        }
        if (this.collectionId !== undefined && this.collectionId !== null) {
            writer.writeVector(this.collectionId, (item) => {
                writer.writeInt(item);
            });
        }
        if (this.prepaidUpgradeHash !== undefined && this.prepaidUpgradeHash !== null) {
            writer.tgWriteString(this.prepaidUpgradeHash);
        }
        if (this.dropOriginalDetailsStars !== undefined && this.dropOriginalDetailsStars !== null) {
            writer.writeLargeInt(this.dropOriginalDetailsStars, 64);
        }
        if (this.giftNum !== undefined && this.giftNum !== null) {
            writer.writeInt(this.giftNum);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedStarGift {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nameHidden = true;
            args.nameHidden = _nameHidden;
        } else {
            args.nameHidden = false;
        }
        if (args.flags & (1 << 5)) {
            const _unsaved = true;
            args.unsaved = _unsaved;
        } else {
            args.unsaved = false;
        }
        if (args.flags & (1 << 9)) {
            const _refunded = true;
            args.refunded = _refunded;
        } else {
            args.refunded = false;
        }
        if (args.flags & (1 << 10)) {
            const _canUpgrade = true;
            args.canUpgrade = _canUpgrade;
        } else {
            args.canUpgrade = false;
        }
        if (args.flags & (1 << 12)) {
            const _pinnedToTop = true;
            args.pinnedToTop = _pinnedToTop;
        } else {
            args.pinnedToTop = false;
        }
        if (args.flags & (1 << 17)) {
            const _upgradeSeparate = true;
            args.upgradeSeparate = _upgradeSeparate;
        } else {
            args.upgradeSeparate = false;
        }
        if (args.flags & (1 << 1)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        if (args.flags & (1 << 2)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _msgId = reader.tgReadObject();
            args.msgId = _msgId;
        } else {
            args.msgId = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _savedId = reader.readLargeInt(64);
            args.savedId = _savedId;
        } else {
            args.savedId = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _convertStars = reader.readLargeInt(64);
            args.convertStars = _convertStars;
        } else {
            args.convertStars = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _upgradeStars = reader.readLargeInt(64);
            args.upgradeStars = _upgradeStars;
        } else {
            args.upgradeStars = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _canExportAt = reader.readInt();
            args.canExportAt = _canExportAt;
        } else {
            args.canExportAt = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _transferStars = reader.readLargeInt(64);
            args.transferStars = _transferStars;
        } else {
            args.transferStars = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _canTransferAt = reader.readInt();
            args.canTransferAt = _canTransferAt;
        } else {
            args.canTransferAt = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _canResellAt = reader.readInt();
            args.canResellAt = _canResellAt;
        } else {
            args.canResellAt = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _collectionId = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.collectionId = _collectionId;
        } else {
            args.collectionId = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _prepaidUpgradeHash = reader.tgReadString();
            args.prepaidUpgradeHash = _prepaidUpgradeHash;
        } else {
            args.prepaidUpgradeHash = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _dropOriginalDetailsStars = reader.readLargeInt(64);
            args.dropOriginalDetailsStars = _dropOriginalDetailsStars;
        } else {
            args.dropOriginalDetailsStars = undefined;
        }
        if (args.flags & (1 << 19)) {
            const _giftNum = reader.readInt();
            args.giftNum = _giftNum;
        } else {
            args.giftNum = undefined;
        }
        return new SavedStarGift(args);
    }
}