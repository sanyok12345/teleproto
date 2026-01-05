import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";
import { TypeTextWithEntities } from "./TypeTextWithEntities";
import { TypePeer } from "./TypePeer";

export class MessageActionStarGift extends TLObject {
    static CONSTRUCTOR_ID = 3928764883;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionStarGift";
    static classType = "constructor";

    flags!: number;
    nameHidden?: boolean;
    saved?: boolean;
    converted?: boolean;
    upgraded?: boolean;
    refunded?: boolean;
    canUpgrade?: boolean;
    prepaidUpgrade?: boolean;
    upgradeSeparate?: boolean;
    auctionAcquired?: boolean;
    gift!: TypeStarGift;
    message?: TypeTextWithEntities;
    convertStars?: bigint;
    upgradeMsgId?: number;
    upgradeStars?: bigint;
    fromId?: TypePeer;
    peer?: TypePeer;
    savedId?: bigint;
    prepaidUpgradeHash?: string;
    giftMsgId?: number;
    toId?: TypePeer;
    giftNum?: number;

    constructor(args: { flags?: number, nameHidden?: boolean, saved?: boolean, converted?: boolean, upgraded?: boolean, refunded?: boolean, canUpgrade?: boolean, prepaidUpgrade?: boolean, upgradeSeparate?: boolean, auctionAcquired?: boolean, gift?: TypeStarGift, message?: TypeTextWithEntities, convertStars?: bigint, upgradeMsgId?: number, upgradeStars?: bigint, fromId?: TypePeer, peer?: TypePeer, savedId?: bigint, prepaidUpgradeHash?: string, giftMsgId?: number, toId?: TypePeer, giftNum?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nameHidden = args.nameHidden;
        this.saved = args.saved;
        this.converted = args.converted;
        this.upgraded = args.upgraded;
        this.refunded = args.refunded;
        this.canUpgrade = args.canUpgrade;
        this.prepaidUpgrade = args.prepaidUpgrade;
        this.upgradeSeparate = args.upgradeSeparate;
        this.auctionAcquired = args.auctionAcquired;
        this.gift = args.gift!;
        this.message = args.message;
        this.convertStars = args.convertStars;
        this.upgradeMsgId = args.upgradeMsgId;
        this.upgradeStars = args.upgradeStars;
        this.fromId = args.fromId;
        this.peer = args.peer;
        this.savedId = args.savedId;
        this.prepaidUpgradeHash = args.prepaidUpgradeHash;
        this.giftMsgId = args.giftMsgId;
        this.toId = args.toId;
        this.giftNum = args.giftNum;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3928764883, false);
        let flags = 0;
        if (this.nameHidden) { flags |= 1 << 0; }
        if (this.saved) { flags |= 1 << 2; }
        if (this.converted) { flags |= 1 << 3; }
        if (this.upgraded) { flags |= 1 << 5; }
        if (this.refunded) { flags |= 1 << 9; }
        if (this.canUpgrade) { flags |= 1 << 10; }
        if (this.prepaidUpgrade) { flags |= 1 << 13; }
        if (this.upgradeSeparate) { flags |= 1 << 16; }
        if (this.auctionAcquired) { flags |= 1 << 17; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        if (this.convertStars !== undefined && this.convertStars !== null) { flags |= 1 << 4; }
        if (this.upgradeMsgId !== undefined && this.upgradeMsgId !== null) { flags |= 1 << 5; }
        if (this.upgradeStars !== undefined && this.upgradeStars !== null) { flags |= 1 << 8; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 11; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 12; }
        if (this.savedId !== undefined && this.savedId !== null) { flags |= 1 << 12; }
        if (this.prepaidUpgradeHash !== undefined && this.prepaidUpgradeHash !== null) { flags |= 1 << 14; }
        if (this.giftMsgId !== undefined && this.giftMsgId !== null) { flags |= 1 << 15; }
        if (this.toId !== undefined && this.toId !== null) { flags |= 1 << 18; }
        if (this.giftNum !== undefined && this.giftNum !== null) { flags |= 1 << 19; }
        writer.writeInt(flags, false);
        if (this.nameHidden !== undefined && this.nameHidden !== null) {
        }
        if (this.saved !== undefined && this.saved !== null) {
        }
        if (this.converted !== undefined && this.converted !== null) {
        }
        if (this.upgraded !== undefined && this.upgraded !== null) {
        }
        if (this.refunded !== undefined && this.refunded !== null) {
        }
        if (this.canUpgrade !== undefined && this.canUpgrade !== null) {
        }
        if (this.prepaidUpgrade !== undefined && this.prepaidUpgrade !== null) {
        }
        if (this.upgradeSeparate !== undefined && this.upgradeSeparate !== null) {
        }
        if (this.auctionAcquired !== undefined && this.auctionAcquired !== null) {
        }
        writer.write(this.gift.getBytes());
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        if (this.convertStars !== undefined && this.convertStars !== null) {
            writer.writeLargeInt(this.convertStars, 64);
        }
        if (this.upgradeMsgId !== undefined && this.upgradeMsgId !== null) {
            writer.writeInt(this.upgradeMsgId);
        }
        if (this.upgradeStars !== undefined && this.upgradeStars !== null) {
            writer.writeLargeInt(this.upgradeStars, 64);
        }
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write(this.peer.getBytes());
        }
        if (this.savedId !== undefined && this.savedId !== null) {
            writer.writeLargeInt(this.savedId, 64);
        }
        if (this.prepaidUpgradeHash !== undefined && this.prepaidUpgradeHash !== null) {
            writer.tgWriteString(this.prepaidUpgradeHash);
        }
        if (this.giftMsgId !== undefined && this.giftMsgId !== null) {
            writer.writeInt(this.giftMsgId);
        }
        if (this.toId !== undefined && this.toId !== null) {
            writer.write(this.toId.getBytes());
        }
        if (this.giftNum !== undefined && this.giftNum !== null) {
            writer.writeInt(this.giftNum);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionStarGift {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nameHidden = true;
            args.nameHidden = _nameHidden;
        } else {
            args.nameHidden = false;
        }
        if (args.flags & (1 << 2)) {
            const _saved = true;
            args.saved = _saved;
        } else {
            args.saved = false;
        }
        if (args.flags & (1 << 3)) {
            const _converted = true;
            args.converted = _converted;
        } else {
            args.converted = false;
        }
        if (args.flags & (1 << 5)) {
            const _upgraded = true;
            args.upgraded = _upgraded;
        } else {
            args.upgraded = false;
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
        if (args.flags & (1 << 13)) {
            const _prepaidUpgrade = true;
            args.prepaidUpgrade = _prepaidUpgrade;
        } else {
            args.prepaidUpgrade = false;
        }
        if (args.flags & (1 << 16)) {
            const _upgradeSeparate = true;
            args.upgradeSeparate = _upgradeSeparate;
        } else {
            args.upgradeSeparate = false;
        }
        if (args.flags & (1 << 17)) {
            const _auctionAcquired = true;
            args.auctionAcquired = _auctionAcquired;
        } else {
            args.auctionAcquired = false;
        }
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        if (args.flags & (1 << 1)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _convertStars = reader.readLargeInt(64);
            args.convertStars = _convertStars;
        } else {
            args.convertStars = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _upgradeMsgId = reader.readInt();
            args.upgradeMsgId = _upgradeMsgId;
        } else {
            args.upgradeMsgId = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _upgradeStars = reader.readLargeInt(64);
            args.upgradeStars = _upgradeStars;
        } else {
            args.upgradeStars = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _savedId = reader.readLargeInt(64);
            args.savedId = _savedId;
        } else {
            args.savedId = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _prepaidUpgradeHash = reader.tgReadString();
            args.prepaidUpgradeHash = _prepaidUpgradeHash;
        } else {
            args.prepaidUpgradeHash = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _giftMsgId = reader.readInt();
            args.giftMsgId = _giftMsgId;
        } else {
            args.giftMsgId = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _toId = reader.tgReadObject();
            args.toId = _toId;
        } else {
            args.toId = undefined;
        }
        if (args.flags & (1 << 19)) {
            const _giftNum = reader.readInt();
            args.giftNum = _giftNum;
        } else {
            args.giftNum = undefined;
        }
        return new MessageActionStarGift(args);
    }
}